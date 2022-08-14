import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import TokenGrid from "./TokenGrid";

import { getToken } from "../lib/api";

function MarketPlace({ contract }) {
    const [tokens, setTokens] = useState(null);
    const [page, setPage] = useState(0);
    const pageLength = 5;

    const previousPage = () => setPage(Math.max(page - pageLength, 0));
    const nextPage = () => setPage(Math.max(page + pageLength, 0));

    useEffect(() => {
        const getData = async () => {
            let query = `v1/contracts/${contract}/bigmaps/listings/keys`;
            let res = await fetch(
                TZKT_API + query + `?offset=${page}&limit=${pageLength}`
            );
            let data = await res.json();
            if (data.length === 0) {
                setPage(Math.max(page - pageLength, 0));
                return;
            }
            let tokens = [];
            for (let item of data) {
                if (item.active) {
                    let token = await getToken(contract, item.key);
                    if (token) {
                        token["price"] = parseInt(item.value);
                        tokens.push(token);
                    }
                }
            }
            setTokens(tokens);
        };
        getData().catch(console.error);
    }, [page, pageLength, contract]);

    if (tokens) {
        return (
            <div>
                <h1>Marketplace</h1>
                <TokenGrid
                    tokens={tokens}
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
            </div>
        );
    } else {
        return "Loading...";
    }
}

export default MarketPlace;
