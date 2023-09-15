import Layout from "./Layout";
import { useEffect, useState } from "react";
import { TZKT_API } from "../consts";
import { getContractMetadata } from "../lib/api";
import referenceContract from "../contracts";
import SeriesOverviewGrid from "./SeriesOverviewGrid";
import SeriesBox from "./SeriesBox";

function SeriesOverview() {
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

    const query = `v1/contracts/${referenceContract}/same?sort.desc=firstActivity`;
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
            result = result.filter((e) => e.firstActivity >= 2332268);
            if (result.length > 0) {
                const newContracts = await Promise.all(
                    result.map(async (c) => {
                        let res = await fetch(
                            TZKT_API + `v1/contracts/${c.address}`
                        );
                        const contract = await res.json();
                        const metadata = await getContractMetadata(c.address);
                        return { contract, metadata };
                    })
                );

                setContracts(contracts.concat(newContracts));
                setMaybeMore(result.length === pageLength);
            } else {
                setPage(Math.max(page - pageLength, 0));
            }
        }

        fetchContracts().catch(console.error);
    });

    if (contracts.length > 0) {
        return (
            <Layout>
                <SeriesOverviewGrid loadMore={loadMore}>
                    {contracts.map(function (c, idx) {
                        return <SeriesBox contract={c.contract.address} key={idx}/>;
                    })}
                </SeriesOverviewGrid>
            </Layout>
        );
    }
}

export default SeriesOverview;
