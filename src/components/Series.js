import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";

import { useEffect, useState } from "react";

import { getContractStorage, getContractMetadata, getToken } from "../lib/api";
import UserDetail from "./UserDetail";
import MarketPlace from "./Marketplace";
import TokenImage from "./TokenImage";

function Series() {
    let { contract } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [numTokens, setNumTokens] = useState(null);
    const [numTokensMinted, setNumTokensMinted] = useState(null);
    const [price, setPrice] = useState(null);
    const [artist, setArtist] = useState(null);
    const [previewArtifactUrl, setPreviewArtifactUrl] = useState(null);
    const [previewDisplayUrl, setPreviewDisplayUrl] = useState(null);
    const [paused, setPaused] = useState(null);

    useEffect(() => {
        const fetchStorage = async () => {
            setNumTokens(await getContractStorage(contract, "num_tokens"));
            setNumTokensMinted(
                await getContractStorage(contract, "last_token_id")
            );
            setPrice(await getContractStorage(contract, "price"));
            setArtist(await getContractStorage(contract, "artist_address"));
            setPaused(await getContractStorage(contract, "paused"));
            setMetadata(await getContractMetadata(contract));
            let token = await getToken(contract, 0);
            setPreviewArtifactUrl(token.metadata.artifactUri);
            setPreviewDisplayUrl(token.metadata.displayUri);
        };

        fetchStorage().catch(console.error);
    }, [contract]);

    if (numTokens && metadata) {
        return (
            <Layout>
                <div>
                    <div>
                        <b>{metadata.name}</b>
                    </div>
                    <div>
                        by <UserDetail address={artist} isLink={true}/>
                    </div>
                    <div style={{marginTop: "1vh"}}>{metadata.description}</div>
                    {/* <div>{paused ? "paused" : "not paused"}</div> */}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexDirection: "column",
                    }}
                >
                    <div
                        title="token"
                        style={{
                            border: "None",
                            width: "min(400px, 75vw)",
                            height: "min(400px, 75vw)",
                            margin: "20px 0 0 0",
                        }}
                    >
                        <TokenImage
                            url={previewArtifactUrl}
                            displayUrl={previewDisplayUrl}
                        />
                    </div>
                    <div style={{ margin: "1vh 0 1vh 0" }}>
                        ꜩ {price / 1000000} &nbsp;|&nbsp;  {numTokensMinted} / {numTokens} minted
                    </div>
                </div>
                <Link to={`/mint/${contract}`}>
                    <button className="btn btn-default" name="mint" id="mint">
                        Go to mint page
                    </button>
                </Link>
                <div style={{ marginTop: "5vh" }}>
                <MarketPlace contract={contract}></MarketPlace>
                </div>
            </Layout>
        );
    } else {
        <Layout>return "Loading..";</Layout>;
    }
}

export default Series;
