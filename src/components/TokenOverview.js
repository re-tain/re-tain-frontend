import TokenBox from "./TokenBox";

import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

function TokenOverview({ query }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(TZKT_API + query)
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

    if (items && items.length > 0) {
        let tokens = items
        if("token" in items[0]) tokens = items.map(item => item.token)
        return (
            <div>
                <h1>Token Overview</h1>
                <div
                    style={{
                        display: "flex",    
                        flexWrap: "wrap",
                    }}
                >
                    {tokens.map((token) => (
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
