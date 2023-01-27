import Layout from "./Layout";
import { useEffect, useState } from "react";
import { TZKT_API } from "../consts";
import { getContractMetadata } from "../lib/api";
import { resolveIpfs } from "../lib/utils";

function SeriesOverview() {
    const pageLength = 20;
    const [contracts, setContracts] = useState([]);
    const [page, setPage] = useState(0);
    const [oldPage, setOldPage] = useState(0);
    const [maybeMore, setMaybeMore] = useState(true);
    const [update, setUpdate] = useState(1);

    const loadMore = () => {
        setOldPage(page);
        setPage(Math.max(page + pageLength, 0));
    };

    const query = `v1/contracts/KT1Ur27NuUcidAxh86nmmF3RNw2CRmQp9Vrv/same`;
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
                setContracts(
                    await Promise.all(
                        result.map(async (c) => {
                            let res = await fetch(
                                TZKT_API + `v1/contracts/${c.address}`
                            );
                            const contract = await res.json();
                            const metadata = await getContractMetadata(
                                c.address
                            );
                            return { contract, metadata };
                        })
                    )
                );

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
                {contracts.map(function (d, idx) {
                    return (
                        <div key={idx}>
                            <p>{d.metadata.name}</p>
                            <p>{d.contract.address}</p>
                            <img src={resolveIpfs(d.metadata.displayUri)}></img>
                        </div>
                    );
                })}
            </Layout>
        );
    }
}

export default SeriesOverview;
