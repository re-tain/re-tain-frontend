import MintForm from "./MintForm";

import { useContext } from "react";

import { WalletContext, mint } from "../lib/wallet";
import { getRandomHash } from "../lib/utils";

function Mint({ contract, price, hash, active }) {
    const wallet = useContext(WalletContext);

    let handleMint = async (e) => {
        console.log(hash)
        e.preventDefault();
        await mint(wallet, contract, price, hash);
    };

    let handleSurpriseMint = async (e) => {
        console.log('surprise')
        e.preventDefault();
        await mint(wallet, contract, price, getRandomHash());
    };

    return (
        <div>
            <div>
                <MintForm
                    onMint={handleMint}
                    onSurpriseMint={handleSurpriseMint}
                    price={price}
                    showButton={active}
                />
            </div>
        </div>
    );
}

export default Mint;
