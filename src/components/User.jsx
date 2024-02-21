import Layout from "./Layout";
import { extractTokensForOverview } from "../lib/utils";

import { useParams } from "react-router-dom";

import UserDetail from "./UserDetail";
import { useContext, useEffect, useState } from "react";
import { ContractsContext } from "../App";
import TokenOverviewWithArray from "./TokenOverviewWithArray";
import { getTokenBalances } from "../lib/api";
function User() {
    let { address } = useParams();
    const contracts = useContext(ContractsContext);
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        async function action() {
            setTokens(await getTokenBalances(address, contracts));
        }
        action().catch(console.error);
    }, [contracts]);

    if (address && contracts.length > 0) {
        return (
            <Layout>
                <UserDetail address={address} />
                <TokenOverviewWithArray
                    tokens={tokens}
                    pageLength={6}
                    title={"Collection"}
                    extractTokensForOverview = {extractTokensForOverview}
                ></TokenOverviewWithArray>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default User;
