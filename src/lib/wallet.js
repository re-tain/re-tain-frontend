import React from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { TEZOS_NETWORK, RPC_NODE } from "../consts";

const options = {
    name: "EditART",
    preferredNetwork: TEZOS_NETWORK,
};
export const beaconWallet = new BeaconWallet(options);
export const WalletContext = React.createContext(undefined);

const checkIfWalletConnected = async (wallet) => {
    try {
        const activeAccount = await wallet.client.getActiveAccount();
        if (!activeAccount) {
            await wallet.client.requestPermissions({
                type: { network: TEZOS_NETWORK },
            });
        }
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

export const mint = async (wallet, contractAddress, queryString) => {
    const response = await checkIfWalletConnected(wallet);

    if (response.success) {
        const tezos = new TezosToolkit(RPC_NODE);
        tezos.setWalletProvider(wallet);
        const contract = await tezos.wallet.at(contractAddress);
        const operation = await contract.methods.mint(queryString).send({
            amount: 1000000,
            mutez: true,
        });
        const result = await operation.confirmation();
        console.log(result);
    }
};
