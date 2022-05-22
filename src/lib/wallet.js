import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TEZOS_NETWORK, RPC_NODE } from "../consts";

const options = {
    name: "EditART",
    preferredNetwork: TEZOS_NETWORK,
};

const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
    return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
    let account = await wallet.client.getActiveAccount();

    if (!account) {
        await wallet.requestPermissions({
            network: { type: TEZOS_NETWORK },
        });
        account = await wallet.client.getActiveAccount();
    }
    return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
    await wallet.disconnect();
    return { success: true, wallet: null };
};

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

const mint = async (contractAddress, queryString) => {
    const wallet = new BeaconWallet(options);
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

export {
    connectWallet,
    disconnectWallet,
    getActiveAccount,
    checkIfWalletConnected,
    mint,
};
