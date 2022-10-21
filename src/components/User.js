import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import contracts from "../contracts";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
function User() {
    let { address } = useParams();
    if (address) {
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract.in": contracts.map((c) => c.address).join(","),
                account: address,
                "balance.gt": 0,
                "sort.desc": "firstTime"
            });
        return (
            <Layout>
                <UserDetail address={address} />
                <h1>Collection</h1>
                <TokenOverview query={query} pageLength={6} extractTokens={extractTokensForOverview}></TokenOverview>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
