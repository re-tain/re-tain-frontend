import MintForm from "./MintForm";

import { useContext } from "react";

import { WalletContext, mint } from "../lib/wallet";
import { getRandomHash } from "../lib/utils";

function Mint({ contract, price, hash, active }) {
    const wallet = useContext(WalletContext);

    let handleMint = async (e) => {
        console.log(hash);
        e.preventDefault();
        await mint(wallet, contract, price, hash);
    };

    let handleSurpriseMint = async (e) => {
        console.log("surprise");
        e.preventDefault();
        await mint(wallet, contract, price, getRandomHash());
    };

    if (active) {
        return (
            <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                onClick={handleMint}
            >
                Mint selected
            </button>
        );
    } else return <></>;
}

export default Mint;
