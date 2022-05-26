import TokenBox from "./TokenBox";

import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import PaginationButtons from "./PaginationButtons";

function TokenOverview({ query }) {
    const [tokens, setTokens] = useState(null);
    const [page, setPage] = useState(0);
    const pageLength = 5;

    const previousPage = () => setPage(Math.max(page - pageLength, 0));
    const nextPage = () => setPage(Math.max(page + pageLength, 0));

    useEffect(() => {
        fetch(TZKT_API + query + `&limit=${pageLength}&offset=${page}`)
            .then((res) => res.json())
            .then((result) => {
                if (result.length > 0 && "token" in result[0])
                    result = result.map((item) => item.token);
                setTokens(result);
            });
    }, [page, pageLength]);

    if (tokens) {
        return (
            <div>
                {tokens.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {tokens.map((token) => {
                            if (token.metadata)
                                return (
                                    <TokenBox
                                        title={token.metadata.name}
                                        url={token.metadata.artifactUri}
                                        key={token.metadata.name}
                                    />
                                );
                        })}
                    </div>
                )}
                {tokens.length == 0 && <div style={{marginTop: '5vw'}}>No tokens found..</div>}
                <PaginationButtons
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
            </div>
        );
    } else {
        return "Loading...";
    }
}

export default TokenOverview;
