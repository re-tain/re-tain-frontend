import Layout from "./Layout";
import { originateContract, WalletContext } from "../lib/wallet";
import { useContext, useState } from "react";
import { ENV, UPLOAD_URL } from "../consts";
import { Link } from "react-router-dom";

import { Switch } from "@headlessui/react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function DeployForm() {
    const [statusText, setStatusText] = useState("");
    const [contractAddress, setContractAddress] = useState(null);
    const wallet = useContext(WalletContext);
    const [agreed, setAgreed] = useState(false);

    async function handleUpload(e) {
        e.preventDefault();
        if (!e.target.form.checkValidity()) {
            setStatusText(`Error: Form data incorrect.`);
            return;
        }
        setStatusText("Uploading token to IPFS...\n");
        const formData = new FormData(e.target.form);
        const resp = await fetch(UPLOAD_URL, {
            method: "POST",
            body: formData,
        });

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
            "ghostnet"
        );
        setStatusText(statusText + `Contract Deployed at ${contract}\n`);
        setContractAddress(contract);
    }

    const openStarterTemplate = () => {
        window.open("https://github.com/pifragile/re-tain-template", "_blank");
    };

    const openOnboarding = () => {
        window.open("https://blog.re-tain.xyz/artist-onboarding/", "_blank");
    };

    return (
        <Layout>
            <>
                    <form > 
                        <div className="space-y-12">
                            <div className=" w-full   pb-12">
                                <h2 className="text-base font-semibold leading-7 text-white">
                                    MINT A GENERATIVE ARTWORK
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-white">
                                    Mint a new generative artwork on your own
                                    Tezos smart contract.
                                </p>

{/* TODO: Tipp: Use Temple Wallet to easily move from testnet to mainnet
 */}
                                <p className="mt-1 text-sm leading-6 text-white">
                                    <button
                                        onClick={openStarterTemplate}
                                        type="button"
                                        className="rounded-md bg-brand px-2.5 mr-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Download Starter Template
                                    </button>

                                    <button
                                        onClick={openOnboarding}
                                        type="button"
                                        className="rounded-md bg-brand px-2.5 mr-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Guide
                                    </button>
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="cover-photo"
                                            className=" text-sm font-medium leading-6 text-white"
                                        >
                                            Upload Artwork
                                        </label>

                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                                            <div className="text-center">
                                                <CodeBracketIcon
                                                    className="mx-auto h-12 w-12 text-white"
                                                    aria-hidden="true"
                                                />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                    >
                                                        <span>
                                                            Upload your .zip
                                                            file
                                                        </span>
                                                        <input
                                                            id="file-upload"
                                                            name="file"
                                                            type="file"
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs leading-5 text-white">
                                                    Up to 30MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" w-full  col-span-full">
                                <label
                                    htmlFor="name"
                                    className="  block text-sm font-medium leading-6 text-white"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="collectionName"
                                    id="collectionName"
                                    className=" w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                                    placeholder="Enter a title..."
                                />
                            </div>

                            <div className="w-full  col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                                        placeholder="Enter a description..."
                                        defaultValue={""}
                                    />
                                </div>
                            </div>

                            <div className="pb-12">
                             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                               
                               
                                    <div>
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Price
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-white sm:text-sm">
                                                    ꜩ
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12  bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span
                                                    className="text-white sm:text-sm"
                                                    id="price-currency"
                                                >
                                                    TEZ
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="editions"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Editions
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-white sm:text-sm"></span>
                                            </div>
                                            <input
                                                type="text"
                                                name="numTokens"
                                                id="numTokens"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12  bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                                                placeholder="000"
                                                aria-describedby="editions-currency"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span
                                                    className="text-white sm:text-sm"
                                                    id="editions-currency"
                                                >
                                                    Editions
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="royalties"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Royalties
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                                            <input
                                                type="text"
                                                name="royalties"
                                                id="royalties"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12  bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                                                placeholder="5 - 90"
                                                aria-describedby="royalties-currency"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span
                                                    className="text-white sm:text-sm"
                                                    id="royalties-currency"
                                                >
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Switch.Group
                            as="div"
                            className="flex gap-x-4 sm:col-span-2"
                        >
                            <div className="flex h-6 items-center">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? "bg-green-600" : "bg-white",
                                        "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                    )}
                                >
                                    <span
                                        className={classNames(
                                            agreed
                                                ? "translate-x-3.5"
                                                : "translate-x-0",
                                            "h-4 w-4 transform rounded-full bg-brand white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                                        )}
                                    />
                                </Switch>
                            </div>
                            <Switch.Label className="text-sm leading-6 text-white"></Switch.Label>
                            <span className="text-sm leading-6 text-white">
                                By selecting this, you agree to our
                            </span>
                            <a
                                href="https://blog.re-tain.xyz/terms"
                                target="_blank"
                                className=" text-brand"
                            >
                                terms and conditions
                            </a>
                        </Switch.Group>

                        <div className="  mt-6 flex items-center justify-start gap-x-6">
                            <button
                                type="submit"
                                onClick={handleUpload}
                                className=" rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Publish Contract to Testnet
                            </button>
                        </div>
                    </form>
             
                {statusText.length > 0 && <div>{statusText}</div>}
                {contractAddress && (
                    <Link to={`/series/${contractAddress}`}>
                        <button
                            className="btn btn-default"
                            name="series"
                            id="series"
                        >
                            Go to series
                        </button>
                    </Link>
                )}
            </>
            {/* <form>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="collectionName"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            placeholder=""
                            required
                        />
                    </label>
                    <br></br>
                    <br></br>
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
                    <br></br>
                    <br></br>
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
                    <br></br>
                    <br></br>
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
                    <br></br>
                    <br></br>
                    <label>
                        Artwork Code: (.zip, max. 30MB)<br></br>
                        <input
                            type="file"
                            name="file"
                            accept=".zip"
                            required
                        ></input>
                    </label>

                    <br></br>
                    <br></br> */}

            {/* {ENV === "XXX" && (
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
                    </label> */}
            {/* <button
                        className="btn btn-default"
                        onClick={handleUpload}
                        type="submit"
                        value="Submit"
                    >
                        {" "}
                        Publish Contract to Testnet{" "}
                    </button>
                </form> */}

            {/* </div>
            <br></br>
            <br></br> <br></br>
            <br></br> */}
        </Layout>
    );
}

export default DeployForm;
