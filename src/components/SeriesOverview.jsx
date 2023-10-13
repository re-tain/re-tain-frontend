import Layout from "./Layout";
import { useEffect, useState } from "react";
import { TZKT_API } from "../consts";
import { getContractMetadata } from "../lib/api";
import referenceContract from "../contracts";
import SeriesOverviewGrid from "./SeriesOverviewGrid";
import SeriesBox from "./SeriesBox";

function SeriesOverview({ hidden = false }) {
    const pageLength = 10;
    const [contracts, setContracts] = useState([]);
    const [page, setPage] = useState(0);
    const [oldPage, setOldPage] = useState(0);
    const [maybeMore, setMaybeMore] = useState(true);
    const [update, setUpdate] = useState(1);

    const loadMore = () => {
        setOldPage(page);
        setPage(Math.max(page + pageLength, 0));
    };

    const query = `v1/contracts/${referenceContract}/same?sort.desc=firstActivity&firstActivity.gte=23322687&includeStorage=true`;
    useEffect(() => {
        async function fetchContracts() {
            if (!maybeMore) return;
            if (contracts.length > 0 && oldPage === page) return;
            let separator = query.includes("?") ? "&" : "?";
            let res = await fetch(
                TZKT_API +
                    query +
                    `${separator}limit=${pageLength}&offset=${page}`
            );
            let result = await res.json();
            if (result.length > 0) {
                console.log(result);
                setContracts(contracts.concat(result));
                setMaybeMore(result.length === pageLength);
            } else {
                setPage(Math.max(page - pageLength, 0));
            }
        }

        fetchContracts().catch(console.error);
    });

    if (hidden) {
        return <Layout>Series overview is disabled.</Layout>;
    }
    
    if (contracts.length > 0) {
        return (
            <Layout>
                <SeriesOverviewGrid loadMore={loadMore}>
                    {contracts.map(function (c, idx) {
                        return <SeriesBox contract={c} key={idx} />;
                    })}
                </SeriesOverviewGrid>
                <br></br>
                <br></br> <br></br>
                <br></br>
            </Layout>
        );
    } else {
        return <Layout>Loading...</Layout>;
    }
}

export default SeriesOverview;
