import Layout from "./Layout";
import { originateContract, WalletContext } from "../lib/wallet";
import { useContext, useState } from "react";

function Home() {
    const [statusText, setStatusText] = useState("");
    const wallet = useContext(WalletContext);

    async function handleUpload(e) {
        e.preventDefault();
        setStatusText("Uploading token to IPFS...\n");
        const formData = new FormData(e.target.form);
        const resp = await fetch(
            "https://seashell-app-ly3q3.ondigitalocean.app/file-upload",
            {
                method: "POST",
                body: formData,
            }
        );
        const data = JSON.parse(await resp.text());
        setStatusText("Deploying Contract...\n");

        const form = e.target.form;
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
                        <input type="text" name="collectionName" />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" />
                    </label>
                    <label>
                        Token Level Description:
                        <input
                            type="text"
                            name="tokenDescription"
                            maxLength="32"
                        />
                    </label>
                    <label>
                        Homepage:
                        <input type="text" name="homepage" />
                    </label>
                    <label>
                        Royalties:
                        <input
                            type="number"
                            name="royalties"
                            min="0"
                            max="25"
                        />
                    </label>
                    <label>
                        Number of tokens:
                        <input
                            type="number"
                            name="numTokens"
                            min="0"
                            max="100000"
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.001"
                        />
                    </label>
                    <br></br>
                    <label>
                        Collection Title Image:
                        <input
                            type="file"
                            name="file"
                            accept="image/png, image/jpeg"
                        ></input>
                    </label>
                    <br></br>
                    <label>
                        Token Code:
                        <input type="file" name="file" accept=".zip"></input>
                    </label>
                    <br></br>
                    Deploy to:
                    <br />
                    <label>
                        <input
                            type="radio"
                            id="html"
                            name="network"
                            value="mainnet"
                        ></input>
                        Mainnet
                    </label>
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

export default Home;
