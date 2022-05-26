import { TZKT_API } from "../consts";
import { useState, useEffect } from "react";

import TokenGrid from "./TokenGrid";

import { CONTRACT_ADDRESS } from "../consts";
import Layout from "./Layout";

function MarketPlace({ query }) {
    const [tokens, setTokens] = useState(null);
    const [page, setPage] = useState(0);
    const pageLength = 5;

    const previousPage = () => setPage(Math.max(page - pageLength, 0));
    const nextPage = () => setPage(Math.max(page + pageLength, 0));

    useEffect(() => {
        const getData = async () => {
            let query = `v1/contracts/${CONTRACT_ADDRESS}/bigmaps/listings/keys`;
            let res = await fetch(
                TZKT_API + query + `?offset=${page}&limit=${pageLength}`
            );
            let data = await res.json();
            let tokens = [];
            for (let item of data) {
                let query = `v1/tokens/?contract=${CONTRACT_ADDRESS}&tokenId=${item.key}`;
                let res = await fetch(TZKT_API + query);
                let data = await res.json();
                if (data.length > 0) {
                    let token = data[0];
                    token["price"] = parseInt(item.value);
                    tokens.push(token);
                }
            }
            setTokens(tokens);
        };
        getData().catch(console.error);
    }, [page, pageLength, query]);

    if (tokens) {
        return (
            <Layout>
                <TokenGrid
                    tokens={tokens}
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
            </Layout>
        );
    } else {
        <Layout>"Loading...";</Layout>;
    }
}

export default MarketPlace;
