import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import TokenGrid from "./TokenGrid";

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
    }, [page, pageLength, query]);

    if (tokens) {
        return (
            <TokenGrid
                tokens={tokens}
                previousPage={previousPage}
                nextPage={nextPage}
            />
        );
    } else {
        return "Loading...";
    }
}

export default TokenOverview;
