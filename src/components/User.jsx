import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
import { useEffect, useState } from "react";
import { TZKT_API } from "../consts";
import referenceContract from "../contracts";
function User() {
    let { address } = useParams();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        async function fetchContracts() {
            let res = await fetch(
                TZKT_API + `v1/contracts/${referenceContract}/same`
            );

            const contracts = (await res.json())
                .filter((e) => e.firstActivity >= 2332268)
                .map((c) => c.address);
            console.log(contracts)
            setContracts(contracts);
        }

        fetchContracts().catch(console.error);
    }, [address]);

    if (address && contracts.length > 0) {
        console.log(contracts);
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract.in":
                    contracts.join(","),
                account: address,
                "balance.gt": 0,
                "sort.desc": "firstTime",
            });
        console.log(query);
        return (
            <Layout>
                <UserDetail address={address} />
                <h1>Collection</h1>
                <TokenOverview
                    query={query}
                    pageLength={6}
                    extractTokens={extractTokensForOverview}
                ></TokenOverview>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
