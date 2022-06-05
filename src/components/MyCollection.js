import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import contracts from "../contracts";

import { useState, useEffect, useContext } from "react";

import { WalletContext } from "../lib/wallet";
function MyCollection() {
    const client = useContext(WalletContext).client;
    const [activeAccount, setActiveAccount] = useState(null);

    useEffect(() => {
        const func = async () => {
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };
        func();
    }, [client]);

    if (activeAccount) {
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract.in": contracts.map(c => c.address).join(','),
                account: activeAccount,
                "balance.gt": 0,
            });
        return (
            <Layout>
                <TokenOverview query={query}></TokenOverview>
            </Layout>
        );
    } else {
        return <Layout>Please sync your wallet.</Layout>;
    }
}

export default MyCollection;
