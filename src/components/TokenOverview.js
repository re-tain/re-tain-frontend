import TokenBox from "./TokenBox";

import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

function TokenOverview() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(
            TZKT_API +
                "v1/tokens/" +
                "?" +
                new URLSearchParams({
                    contract: "KT1UxwEogk6NcfxruTicjkAGb3Mf6gxNsVNk",
                })
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (items) {
        return (
            <div>
                <h1>Token Overview</h1>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {items.map((token) => (
                        <TokenBox
                            title={token.metadata.name}
                            url={token.metadata.artifactUri}
                            key={token.metadata.name}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return "loading...";
    }
}

export default TokenOverview;
