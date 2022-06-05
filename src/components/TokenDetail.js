import { useParams } from "react-router-dom";

import Layout from "./Layout";
import TokenActionForm from "./TokenActionForm";

import { useEffect, useState } from "react";

import { TZKT_API } from "../consts";

import {
    getContractBigmap,
    getContractMetadata,
    getContractStorage,
    getToken,
} from "../lib/api";
import UserDetail from "./UserDetail";
import { resolveIpfs } from "../lib/utils";

function TokenDetail() {
    let { contract, tokenId } = useParams();
    const [tokenPrice, setTokenPrice] = useState(null);
    const [owner, setOwner] = useState(null);
    const [token, setToken] = useState(null);
    const [artist, setArtist] = useState(null);
    const [creator, setCreator] = useState(null);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract, tokenId);
            setToken(token);
            setArtist(await getContractStorage(contract, "artist_address"));
            setTokenPrice(
                await getContractBigmap(contract, "listings", tokenId)
            );
            setOwner(await getContractBigmap(contract, "ledger", tokenId));
            setCreator(await getContractBigmap(contract, "creators", tokenId));
            setMetadata(await getContractMetadata(contract));
        };

        fetchToken().catch(console.error);
    }, [tokenId, contract]);

    if (token && metadata) {
        return (
            <Layout>
                <h1>{token.metadata.name}</h1>
                <div style={{ marginBottom: "2vh" }}>
                    {metadata.description}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                    }}
                >
                    <iframe
                        title="token"
                        style={{
                            border: "None",
                            height: "400px",
                            width: "400px",
                            margin: "10px",
                        }}
                        src={resolveIpfs(token.metadata.artifactUri)}
                    ></iframe>

                    <div style={{ width: "400px", margin: "10px" }}>
                        <TokenActionForm
                            price={tokenPrice}
                            contract={contract}
                            tokenId={tokenId}
                            owner={owner}
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    <div>
                        <b>Owner:</b>
                        <UserDetail address={owner} />
                    </div>
                    <div>
                        <b>Artist:</b>
                        <UserDetail address={artist} />
                    </div>
                    <div>
                        <b>Creator:</b>
                        <UserDetail address={creator} />
                    </div>
                </div>
            </Layout>
        );
    } else {
        <Layout>return "Loading..";</Layout>;
    }
}

export default TokenDetail;
