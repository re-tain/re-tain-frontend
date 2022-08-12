import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { getContractMetadata, getToken } from "../lib/api";

import TokenImage from "./TokenImage";

function SeriesBox({ contract, author }) {
    const [artifactUri, setArtifactUri] = useState(null);
    const [displayUri, setDisplayUri] = useState(null);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract, 0)
            setArtifactUri(token.metadata.artifactUri);
            setDisplayUri(token.metadata.displayUri);
            setMetadata(await getContractMetadata(contract));
        };

        fetchToken().catch(console.error);
    }, [contract]);
    if (metadata && artifactUri) {
        return (
            <div
                style={{
                    margin: "10px",
                    width: "min(400px, 80vw)",
                    height: "min(400px, 80vw)",
                    padding: "10px",
                    position: "relative",
                }}
            >
            <TokenImage url={artifactUri} displayUrl={displayUri} />
                <div
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginTop: "3px",
                    }}
                >
                    {metadata.name}
                    <br/>
                    by {author && author}
                </div>

                <Link to={`/series/${contract}`}>
                    <div
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            display: "inline-block",
                            height: "100%",
                            width: "100%",
                            padding: "20px",
                        }}
                    ></div>
                </Link>
            </div>
        );
    }
}

export default SeriesBox;
