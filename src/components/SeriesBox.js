import { Link } from "react-router-dom";
import { resolveIpfs } from "../lib/utils";

import { useEffect, useState } from "react";

import { getContractMetadata, getToken } from "../lib/api";

function SeriesBox({ contract }) {
    const [artifactUri, setArtifactUri] = useState(null);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            setArtifactUri((await getToken(contract, 0)).metadata.artifactUri);
            setMetadata(await getContractMetadata(contract));
        };

        fetchToken().catch(console.error);
    }, [contract]);
    if (metadata && artifactUri) {
        return (
            <div
                style={{
                    margin: "10px",
                    width: "50vw",
                    height: "50vw",
                    padding: "10px",
                    position: "relative",
                }}
            >
                <iframe
                    title="token"
                    style={{
                        border: "None",
                        height: "100%",
                        width: "100%",
                    }}
                    src={resolveIpfs(artifactUri)}
                />
                <div
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginTop: "3px",
                    }}
                >
                    {metadata.name}
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
