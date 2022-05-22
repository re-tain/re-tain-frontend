import Layout from "./Layout";
import MintForm from "./MintForm";
import { useState } from "react";
import { mint } from "../lib/wallet";
import { CONTRACT_ADDRESS } from "../consts";

function Mint() {
    const [queryString, setQueryString] = useState(
        "m0=0.5&m1=0.5&m2=0.5&m3=0.5&m4=0.5"
    );
    let setSrc = (m0, m1, m2, m3, m4) => {
        setQueryString(`m0=${m0}&m1=${m1}&m2=${m2}&m3=${m3}&m4=${m4}`);
    };

    let handleMint = async () => {
        await mint(CONTRACT_ADDRESS, queryString);
    };
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
                    style={{
                        border: "None",
                        height: "400px",
                        width: "400px",
                    }}
                    src={"https://pifragile.com/eatest/?" + queryString}
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
                    <MintForm onSubmitForm={setSrc} onMint={handleMint} />
                </div>
            </div>
        </Layout>
    );
}

export default Mint;
