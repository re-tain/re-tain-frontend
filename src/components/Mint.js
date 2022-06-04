import Layout from "./Layout";
import MintForm from "./MintForm";

import { useState, useContext, useEffect } from "react";

import { WalletContext, mint } from "../lib/wallet";
import { resolveIpfs } from "../lib/utils";

import { useParams } from "react-router-dom";
import { getContractStorage } from "../lib/api";
import { bytes2Char } from "@taquito/utils";
function Mint() {
    const wallet = useContext(WalletContext);

    let { contract } = useParams();
    const [price, setPrice] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);

    useEffect(() => {
        const fetchStorage = async () => {
            setBaseUrl(
                bytes2Char(await getContractStorage(contract, "base_url"))
            );
            setPrice(await getContractStorage(contract, "price"));
        };

        fetchStorage().catch(console.error);
    }, [contract]);

    const [queryString, setQueryString] = useState(
        "m0=0.5&m1=0.5&m2=0.5&m3=0.5&m4=0.5"
    );
    let setSrc = (m0, m1, m2, m3, m4) => {
        setQueryString(`m0=${m0}&m1=${m1}&m2=${m2}&m3=${m3}&m4=${m4}`);
    };

    let handleMint = async () => {
        await mint(wallet, contract, queryString, price);
    };
    if (baseUrl && price) {
        return (
            <Layout>
                <h1>Mint</h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <iframe
                        title="token"
                        style={{
                            border: "None",
                            height: "400px",
                            width: "400px",
                        }}
                        src={`${resolveIpfs(baseUrl)}?${queryString}`}
                    ></iframe>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1vh",
                    }}
                >
                    <div style={{ width: "400px" }}>
                        <MintForm
                            onSubmitForm={setSrc}
                            onMint={handleMint}
                            price={price}
                        />
                    </div>
                </div>
            </Layout>
        );
    } else {
        return <Layout>Loading...</Layout>;
    }
}

export default Mint;
