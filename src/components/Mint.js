import MintForm from "./MintForm";

import { useState, useContext, useEffect } from "react";

import { WalletContext, mint } from "../lib/wallet";
import { resolveIpfs } from "../lib/utils";

import { getContractStorage } from "../lib/api";
import { bytes2Char } from "@taquito/utils";
function Mint({ contract}) {
    const wallet = useContext(WalletContext);

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
        let qs = `m0=${m0}&m1=${m1}&m2=${m2}&m3=${m3}&m4=${m4}`;
        setQueryString(qs);
        document
            .getElementById("tokenFrame")
            .contentWindow.postMessage({ editartQueryString: qs }, "*");
    };

    let handleMint = async () => {
        await mint(wallet, contract, queryString, price);
    };
    if (baseUrl && price) {
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        maxWidth: "100vw",
                        flexWrap: "wrap",
                        marginTop: "2vw",
                        padding: 0,
                    }}
                >
                    <iframe
                        id="tokenFrame"
                        title="token"
                        style={{
                            border: "None",
                            width: "35vw",
                            height: "35vw",
                            marginRight: "2vw",
                            minWidth: "300px",
                            minHeight: "300px",
                        }}
                        src={`${resolveIpfs(baseUrl)}`}
                    ></iframe>

<div                         style={{
                            marginRight: "2vw",
                            width: "35vw",
                            minWidth: "300px"
                        }}>

                        <MintForm
                            onSubmitForm={setSrc}
                            onMint={handleMint}
                            price={price}
                        />
                    </div>
                </div>

            </div>
        );
    } else {
        return "Loading...";
    }
}

export default Mint;
