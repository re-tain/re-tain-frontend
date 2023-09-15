import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";

import { useContext, useEffect, useState } from "react";

import { getContractStorage, getContractMetadata } from "../lib/api";
import UserDetail from "./UserDetail";
import Mint from "./Mint";
import { extractTokensForOverview, formatMutez, resolveIpfs } from "../lib/utils";

import TokenOverview from "./TokenOverview";
import { originateContractFromExisting, WalletContext } from "../lib/wallet";
import MarketPlace from "./Marketplace";
import { ENV } from "../consts";
import LiveViewIFrame from "./LiveViewIFrame";
import PrevNextForm from "./PrevNextForm";
import { bytes2Char } from "@taquito/utils";

function Series() {
    const wallet = useContext(WalletContext);
    const client = wallet.client;
    let { contract } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [numTokens, setNumTokens] = useState(null);
    const [price, setPrice] = useState(null);
    const [numTokensMinted, setNumTokensMinted] = useState(null);
    const [artist, setArtist] = useState(null);
    const [activeAccount, setActiveAccount] = useState(null);
    const [paused, setPaused] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const [hash, setHash] = useState('000000000000000000000000000000');

    useEffect(() => {
        const fetchStorage = async () => {
            setPrice(await getContractStorage(contract, "price"));
            setNumTokens(await getContractStorage(contract, "num_tokens"));
            setNumTokensMinted(
                await getContractStorage(contract, "last_token_id")
            );
            setPaused(await getContractStorage(contract, "paused"));
            setArtist(await getContractStorage(contract, "artist_address"));
            setBaseUrl(bytes2Char(await getContractStorage(contract, "base_url")));
            setMetadata(await getContractMetadata(contract));
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };

        fetchStorage().catch(console.error);
    }, [contract, client]);

    const handleDeployToMainnet = async () => {
        await originateContractFromExisting(wallet, contract, "mainnet");
    };

    if (numTokens && metadata && baseUrl) {
        return (
            <Layout>
                <div>
                    <div>
                        <b>{metadata.name}</b>
                    </div>
                    <div>
                        by <UserDetail address={artist} isLink={true} />
                    </div>
                </div>
                <br />
                <div className="token-detail-width token-detail-height">
                <LiveViewIFrame url={`${baseUrl}?hash=${hash}`}/>
                </div>

                <div style={{ marginTop: "1vh", whiteSpace: "pre-wrap" }}>
                    {metadata.description}
                </div>
                <br />

                <div className="token-detail-width" >
                    <div style={{ margin: "0 0 1vh 0" }}>
                        {numTokensMinted} / {numTokens} minted | {formatMutez(price)}
                    </div>
                    <PrevNextForm setHash={setHash}/>
                    <div style={{ margin: "0vh 0 0vh 0" }}>
                        <Mint
                            contract={contract}
                            price={price}
                            active={
                                numTokensMinted !== numTokens &&
                                (activeAccount === artist || !paused)
                            }
                            hash={hash}
                        />
                    </div>
                </div>
                {activeAccount === artist && (
                    <div className="token-detail-width">
                        <Link to={`/artist-panel/${contract}`}>
                            <button className="btn btn-default" style={{width: '100%', marginTop: "2vh"}}>
                                Go to artist panel
                            </button>
                        </Link>
                    </div>
                )}

                {/* {activeAccount === artist && ENV !== "prod" && (
                    <button
                        class="btn btn-default"
                        onClick={handleDeployToMainnet}
                    >
                        Deploy to mainnet
                    </button>
                )} */}

                <div style={{ marginTop: "3vh" }}>
                    <MarketPlace contract={contract}></MarketPlace>
                </div>

                <div style={{ marginTop: "5vh" }}>
                    <h1>All tokens</h1>
                    <TokenOverview
                        query={`v1/tokens?contract=${contract}`}
                        pageLength={30}
                        extractTokens={extractTokensForOverview}
                    ></TokenOverview>
                </div>
            </Layout>
        );
    } else {
        return <Layout>Loading...</Layout>;
    }
}

export default Series;
