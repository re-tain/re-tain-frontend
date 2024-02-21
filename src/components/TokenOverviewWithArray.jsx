import { useEffect, useState } from "react";

import TokenGrid from "./TokenGrid";

function TokenOverviewWithArray({
    tokens,
    title,
    pageLength,
    extractTokensForOverview,
}) {
    const [page, setPage] = useState(0);
    const [oldPage, setOldPage] = useState(0);
    const [maybeMore, setMaybeMore] = useState(true);
    const [update, setUpdate] = useState(1);
    const [displayTokens, setDisplayTokens] = useState([]);

    const loadMore = () => {
        setOldPage(page);
        setPage(Math.max(page + pageLength, 0));
    };

    useEffect(() => {
        async function action() {
            if (displayTokens.length > 0 && page === oldPage) return;
            setDisplayTokens(
                displayTokens.concat(
                    await extractTokensForOverview(
                        tokens.slice(page, page + pageLength)
                    )
                )
            );
        }
        action().catch(console.error);
    }, [tokens, page]);

    return (
        <TokenGrid
            tokens={displayTokens}
            loadMore={loadMore}
            title={title}
            update={update}
        />
    );
}

export default TokenOverviewWithArray;
