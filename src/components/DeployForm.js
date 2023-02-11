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
            form.tokenDescription.value,
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
                        Collection Name:
                        <input
                            type="text"
                            name="collectionName"
                            placeholder=" "
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            placeholder=" "
                            required
                        />
                    </label>
                    <label>
                        Token Level Description{" "}
                        <small>(Limited to 32 chars)</small>:
                        <input
                            required
                            type="text"
                            name="tokenDescription"
                            maxLength="32"
                            placeholder=" "
                        />
                    </label>
                    <label>
                        Homepage:
                        <input
                            type="text"
                            name="homepage"
                            placeholder=" "
                            required
                        />
                    </label>
                    <label>
                        Royalties <small>(In %. 0-25)</small>:
                        <input
                            type="number"
                            name="royalties"
                            min="0"
                            max="25"
                            placeholder=" "
                            required
                        />
                    </label>
                    <label>
                        Number of tokens:
                        <input
                            type="number"
                            name="numTokens"
                            min="0"
                            max="100000"
                            placeholder=" "
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.001"
                            placeholder=" "
                            required
                        />
                    </label>
                    <br></br>
                    <label>
                        Collection Title Image <small>(Max 5MB)</small>:
                        <input
                            type="file"
                            name="file"
                            accept="image/png, image/jpeg"
                            required
                        ></input>
                    </label>
                    <br></br>
                    <label>
                        Token Code<small>(Max 30MB)</small>:
                        <input
                            type="file"
                            name="file"
                            accept=".zip"
                            required
                        ></input>
                    </label>
                    <br></br>
                    Deploy to:
                    <br />
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
                        Ghostnet Testnet
                    </label>
                    <br></br>
                    <button
                        className="btn btn-default"
                        onClick={handleUpload}
                        type="submit"
                        value="Submit"
                    >
                        {" "}
                        Deploy Contract{" "}
                    </button>
                </form>
                {statusText.length > 0 && <div>{statusText}</div>}
            </div>
        </Layout>
    );
}

export default DeployForm;
