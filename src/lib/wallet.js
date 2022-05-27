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

const tezos = new TezosToolkit(RPC_NODE);
tezos.setWalletProvider(beaconWallet);

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
        const contract = await tezos.wallet.at(contractAddress);
        const operation = await contract.methods.mint(queryString).send({
            amount: 1000000,
            mutez: true,
        });
        const result = await operation.confirmation();
        console.log(result);
    }
};

export const buy = async (wallet, contractAddress, tokenId, price) => {
    const response = await checkIfWalletConnected(wallet);

    if (response.success) {
        const contract = await tezos.wallet.at(contractAddress);
        const operation = await contract.methods.buy_item(tokenId).send({
            amount: price,
            mutez: true,
        });
        const result = await operation.confirmation();
        console.log(result);
    }
};

export const list = async (wallet, contractAddress, tokenId, price) => {
    const response = await checkIfWalletConnected(wallet);

    if (response.success) {
        const contract = await tezos.wallet.at(contractAddress);
        const operation = await contract.methods
            .list_item(price, tokenId)
            .send();
        const result = await operation.confirmation();
        console.log(result);
    }
};

export const cancelListing = async (wallet, contractAddress, tokenId) => {
    const response = await checkIfWalletConnected(wallet);

    if (response.success) {
        const contract = await tezos.wallet.at(contractAddress);
        const operation = await contract.methods
            .cancel_listing(tokenId)
            .send({});
        const result = await operation.confirmation();
        console.log(result);
    }
};

export const transfer = async (
    wallet,
    contractAddress,
    tokenId,
    from,
    destination
) => {
    const response = await checkIfWalletConnected(wallet);

    if (response.success) {
        const contract = await tezos.wallet.at(contractAddress);
        const transferParams = [
            {
                from_: from,
                txs: [
                    {
                        to_: destination,
                        token_id: tokenId,
                        amount: 1,
                    },
                ],
            },
        ];

        const operation = await contract.methods
            .transfer(transferParams)
            .send({});
        const result = await operation.confirmation();
        console.log(result);
    }
};
