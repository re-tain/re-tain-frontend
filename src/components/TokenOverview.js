import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import TokenGrid from "./TokenGrid";
import { getTokenMetadata } from "../lib/api";

function TokenOverview({ query }) {
    const [tokens, setTokens] = useState(null);
    const [page, setPage] = useState(0);
    const pageLength = 5;

    const previousPage = () => setPage(Math.max(page - pageLength, 0));
    const nextPage = () => setPage(Math.max(page + pageLength, 0));

    useEffect(() => {
        async function fetchTokens() {
            let res = await fetch(TZKT_API + query + `&limit=${pageLength}&offset=${page}`);
            let result = await res.json()
            if (result.length > 0) {
                if ("token" in result[0])
                    result = result.map((item) => item.token);
                for(let token of result) {
                    token.metadata = await getTokenMetadata(token.contract.address, token.tokenId);
                }
                setTokens(result);
            } else {
                setPage(Math.max(page - pageLength, 0));
            }
        }
        
        fetchTokens().catch(console.error);
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
