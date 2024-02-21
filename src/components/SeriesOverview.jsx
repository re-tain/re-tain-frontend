import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { TZKT_API } from "../consts";
import { getAllContracts, getContractMetadata } from "../lib/api";
import referenceContract from "../contracts";
import SeriesOverviewGrid from "./SeriesOverviewGrid";
import SeriesBox from "./SeriesBox";
import { ContractsContext } from "../App";

function SeriesOverview({ hidden = false }) {
    const contracts = useContext(ContractsContext)
    const pageLength = 10;
    const [page, setPage] = useState(pageLength);
    const [oldPage, setOldPage] = useState(0);
    const [maybeMore, setMaybeMore] = useState(true);
    const [update, setUpdate] = useState(1);

    const loadMore = () => {
        setOldPage(page);
        setPage(Math.max(page + pageLength, 0));
    };

    if (hidden) {
        return <Layout>Series overview is disabled.</Layout>;
    }
    
    if (contracts.length > 0) {
        return (
            <Layout>
                <SeriesOverviewGrid loadMore={loadMore}>
                    {contracts.slice(0, page).map(function (c, idx) {
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
