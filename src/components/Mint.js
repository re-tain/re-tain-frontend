import MintForm from "./MintForm";

import { useContext } from "react";

import { WalletContext, mint } from "../lib/wallet";

function Mint({ contract, price, active }) {
    const wallet = useContext(WalletContext);

    let handleMint = async (e) => {
        e.preventDefault();
        await mint(wallet, contract, price);
    };
    return (
        <div>
            <div>
                <MintForm
                    onMint={handleMint}
                    price={price}
                    showButton={active}
                />
            </div>
        </div>
    );
}

export default Mint;
