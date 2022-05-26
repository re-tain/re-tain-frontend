import Layout from "./Layout";
import TokenOverview from "./TokenOverview";
import { CONTRACT_ADDRESS } from "../consts";

import {useState, useEffect} from 'react'

import {getActiveAccount} from '../lib/wallet'
function MyCollection() {

    const [wallet, setWallet] = useState(null);
    useEffect(() => {
        const func = async () => {
          const account = await getActiveAccount();
          if (account) {
            setWallet(account.address);
          }
        };
        func();
      }, []);


    if (wallet) {
        let query =
            "v1/tokens/balances" +
            "?" +
            new URLSearchParams({
                "token.contract": CONTRACT_ADDRESS,
                account: wallet,
            });
        console.log(query);
        return (
            <Layout>
                <TokenOverview query={query}></TokenOverview>
            </Layout>
        );
    }
    else {
        return (
            <Layout>
                Please sync your wallet.
            </Layout>
        );
    }
}

export default MyCollection;
