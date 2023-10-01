import Layout from "./Layout";
import {
    originateContractFromExisting,
    WalletContext,
} from "../lib/wallet";
import { useContext, useState } from "react";
import { ENV } from "../consts";

function DeployFormFromExisting() {
    const [statusText, setStatusText] = useState("");
    const wallet = useContext(WalletContext);

    async function handleUpload(e) {
        e.preventDefault();
        if (!e.target.form.checkValidity()) {
            setStatusText(`Error: Form data incorrect.`);
            return;
        }

        setStatusText("Deploying Contract...\n");

        const form = e.target.form;

        const contract = await originateContractFromExisting(
            wallet,
            form.address.value,
            form.network.value
        );
        setStatusText(statusText + `Contract Deployed at ${contract}\n`);
    }

    return (
        <Layout>
            <div className="main">
                <form>
                    <label>
                        Address of Ghostnet Contract:
                        <input
                            type="text"
                            name="address"
                            placeholder=" "
                            required
                        />
                    </label>
                    <br></br>
                    Deploy to:
                    <br />
                    {ENV === "prod" && (
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

export default DeployFormFromExisting;
