import Layout from "./Layout";
import { originateContract, WalletContext } from "../lib/wallet";
import { useContext, useState } from "react";
import { ENV, UPLOAD_URL } from "../consts";

function DeployForm() {
    const [statusText, setStatusText] = useState("");
    const wallet = useContext(WalletContext);

    async function handleUpload(e) {
        e.preventDefault();
        if (!e.target.form.checkValidity()) {
            setStatusText(`Error: Form data incorrect.`);
            return;
        }
        setStatusText("Uploading token to IPFS...\n");
        const formData = new FormData(e.target.form);
        const resp = await fetch(
            UPLOAD_URL,
            {
                method: "POST",
                body: formData,
            }
        );

        if (resp.status === 413) {
            setStatusText(`Error: Files too large.`);
            return;
        }

        const data = JSON.parse(await resp.text());

        if (!resp.ok) {
            setStatusText(`Error: ${data["message"]}`);
            return;
        }
        setStatusText("Deploying Contract...\n");

        const form = e.target.form;

        if (!data.token_hash || !data.metadata_hash) {
            setStatusText(statusText + `IPFS upload failed\n`);
            return;
        }

        const contract = await originateContract(
            wallet,
            form.price.value * 1000000,
            form.royalties.value,
            form.collectionName.value,
            form.numTokens.value,
            data.metadata_hash,
            data.token_hash,
            form.network.value
        );
        setStatusText(statusText + `Contract Deployed at ${contract}\n`);
    }

    return (
        <Layout>
            <div className="main">
                <form>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="collectionName"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br><br></br>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br><br></br>
                    <label>
                        Royalties (5-90%):
                        <input
                            type="number"
                            name="royalties"
                            min="5"
                            max="90"
                            placeholder=" "
                            required
                        />
                    </label>
                    <br></br><br></br>
                    <label>
                        Editions (10+ recommended):
                        <input
                            type="number"
                            name="numTokens"
                            min="0"
                            max="100000"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br><br></br>
                    <label>
                        Price (per edition in tez):
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="1"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br><br></br>
                    <label>
                        Artwork Code: (.zip, max. 30MB)<br></br>
                        <input
                            type="file"
                            name="file"
                            accept=".zip"
                            required
                        ></input>
                    </label>
                   
                    <br></br><br></br>
                  
                    {ENV === "XXX" && (
                        <label>
                            <input
                                type="radio"
                                id="html"
                                name="network"
                                value="mainnet"
                                required
                            ></input>
                            Mainnet
                        </label>
                    )}
                     
                    <label>
                        <input
                            type="radio"
                            id="html"
                            name="network"
                            value="ghostnet"
                        ></input>
                        Tezos Testnet (Ghostnet)
                    </label>
                    <br></br><br></br>
                    <button
                        className="btn btn-default"
                        onClick={handleUpload}
                        type="submit"
                        value="Submit"
                    >
                        {" "}
                        Publish Contract to Testnet{" "}
                    </button>
                </form>
                {statusText.length > 0 && <div>{statusText}</div>}
            </div>
            <br></br><br></br> <br></br><br></br>
        </Layout>
    );
}

export default DeployForm;
