import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { useWallet } from "@tezos-contrib/react-wallet-provider";

function Home() {
    const { activeAccount } = useWallet();
    const address = activeAccount?.address;

    if (address) {
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract": "KT1UxwEogk6NcfxruTicjkAGb3Mf6gxNsVNk",
                account: activeAccount?.address,
            });
        console.log(query)
        return (
            <Layout>
                <TokenOverview query={query}></TokenOverview>
            </Layout>
        );
    }
}

export default Home;
