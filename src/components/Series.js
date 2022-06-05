import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";

import { useEffect, useState } from "react";


import { getContractStorage, getContractMetadata, getToken } from "../lib/api";
import UserDetail from "./UserDetail";
import { resolveIpfs } from "../lib/utils";
import MarketPlace from "./Marketplace";
import MintButton from "./MintButton";

function Series() {
    let { contract } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [numTokens, setNumTokens] = useState(null);
    const [numTokensMinted, setNumTokensMinted] = useState(null);
    const [price, setPrice] = useState(null);
    const [artist, setArtist] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [paused, setPaused] = useState(null);

    useEffect(() => {
        const fetchStorage = async () => {
            setNumTokens(await getContractStorage(contract, "num_tokens"));
            setNumTokensMinted(await getContractStorage(contract, "last_token_id"))
            setPrice(await getContractStorage(contract, "price"))
            setArtist(await getContractStorage(contract, "artist_address"))
            setPaused(await getContractStorage(contract, "paused"))
            setMetadata(await getContractMetadata(contract));
            setPreviewUrl((await getToken(contract, 0)).metadata.artifactUri)
        };
        
        fetchStorage().catch(console.error);
    }, [contract]);

    if (numTokens && metadata) {
        return (
            <Layout>
                <div>
                    <div>{numTokensMinted} / {numTokens}</div>
                    <div>{price}</div>
                    <div>{artist}</div>
                    <div>{metadata.name}</div>
                    <div>{metadata.description}</div>
                    <div>{paused ? 'paused': 'not paused'}</div>
                    <div>
                        <b>Creator:</b>
                        <UserDetail address={artist} />
                    </div>
                </div>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
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
                        src={resolveIpfs(previewUrl)}
                    ></iframe>

                </div>
                <Link to={`/mint/${contract}`}>
                <MintButton price={price}/>
                </Link>
                <MarketPlace contract={contract}></MarketPlace>
            </Layout>
        );
    } else {
        <Layout>return "Loading..";</Layout>;
    }
}

export default Series;
