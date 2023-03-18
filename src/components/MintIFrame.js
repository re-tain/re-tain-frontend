import { useParams } from "react-router-dom";

import Layout from "./Layout";

import { useEffect, useState } from "react";

import { getContractStorage } from "../lib/api";
import Mint from "./Mint";

function MintIFrame() {
    let { contract } = useParams();
    const [numTokens, setNumTokens] = useState(null);
    const [price, setPrice] = useState(null);
    const [numTokensMinted, setNumTokensMinted] = useState(null);

    useEffect(() => {
        const fetchStorage = async () => {
            setNumTokens(await getContractStorage(contract, "num_tokens"));
            setPrice(await getContractStorage(contract, "price"));
            setNumTokensMinted(
                await getContractStorage(contract, "last_token_id")
            );
        };

        fetchStorage().catch(console.error);
    }, [contract]);

    if (numTokens) {
        return (
            <div style={{width: "190px", marginTop: "calc(50vh - 45px)", marginLeft: "calc(50vw - 95px)"}}>
                <div>
                    {numTokensMinted} / {numTokens} minted
                </div>
                <div>
                    <Mint
                        contract={contract}
                        price={price}
                        active={numTokensMinted !== numTokens}
                    />
                </div>
            </div>
        );
    } else {
        <Layout>return "Loading..";</Layout>;
    }
}

export default MintIFrame;
