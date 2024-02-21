import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
import { useContext } from "react";
import { ContractsContext } from "../App";
function User() {
    let { address } = useParams();
    const contracts = useContext(ContractsContext);

    if (address && contracts.length > 0) {
        console.log(contracts);
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract.in": contracts.map((c) => c.address).join(","),
                account: address,
                "balance.gt": 0,
                "sort.desc": "firstTime",
            });
        console.log(query);
        return (
            <Layout>
                <UserDetail address={address} />
                <TokenOverview
                    query={query}
                    pageLength={6}
                    extractTokens={extractTokensForOverview}
                    title={"Collection"}
                ></TokenOverview>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
