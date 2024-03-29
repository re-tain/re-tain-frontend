import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";
import TokenActionForm from "./TokenActionForm";

import { Fragment, useEffect, useState } from "react";

import {
    getContract,
    getContractBigmap,
    getContractMetadata,
    getContractStorageFull,
    getToken,
} from "../lib/api";
import UserDetail from "./UserDetail";
import { getTokenMetadata } from "../lib/api";
import { formatDate, formatMutez } from "../lib/utils";
import LiveViewIFrame from "./LiveViewIFrame";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function TokenDetail() {
    let { contract, tokenId } = useParams();
    const [tokenPrice, setTokenPrice] = useState(null);
    const [owner, setOwner] = useState(null);
    const [token, setToken] = useState(null);
    const [artist, setArtist] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [deployTime, setDeployTime] = useState(null);
    const [royalties, setRoyalties] = useState(null);
    const [royaltiesTotal, setRoyaltiesTotal] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storage = await getContractStorageFull(contract);
            setPrice(storage.price);
            setRoyalties(storage.royalties);
            const sum = (a) => a.reduce((partialSum, a) => partialSum + a, 0);
            setRoyaltiesTotal(
                sum(
                    Object.values(storage.royalties).map(
                        (r) => parseInt(r) / 10
                    )
                )
            );

            let token = await getToken(contract, tokenId);
            token.metadata = await getTokenMetadata(
                token.contract.address,
                token.tokenId
            );
            setToken(token);
            setArtist(storage.artist_address);
            setTokenPrice(
                await getContractBigmap(contract, "listings", tokenId)
            );
            setOwner(await getContractBigmap(contract, "ledger", tokenId));
            setMetadata(await getContractMetadata(contract));
            const contractData = await getContract(contract);
            setDeployTime(formatDate(contractData.firstActivityTime));
        };

        fetchToken().catch(console.error);
    }, [tokenId, contract]);

    if (token && metadata) {
        return (
            <Layout>
                <div className="mx-auto px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                    {/* Drop */}
                    <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                        {/* Drop image */}
                        <div className="lg:col-span-4 lg:row-end-1">
                            <a href="#ipfsview" target="_blank">
                                <div className=" aspect-h-4 aspect-w-4 overflow-hidden rounded-lg bg-black">
                                    {/* DONE! TODO ANDRE: style the iframe properly  */}
                                    <LiveViewIFrame
                                        url={token.metadata.artifactUri}
                                    />
                                </div>
                            </a>
                        </div>

                        {/* Drop details */}
                        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                            <ul role="list" className="grid grid-cols-1 gap-6">
                                <div className="flex w-full items-center justify-between space-x-6 ">
                                    <UserDetail
                                        address={artist}
                                        imgOnly={true}
                                    />
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-l font-medium text-grey-200">
                                                Created by{" "}
                                                <UserDetail
                                                    address={artist}
                                                    isLink={true}
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-between space-x-6 ">
                                    <UserDetail
                                        address={owner}
                                        imgOnly={true}
                                    />
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-l font-medium text-grey-200">
                                                Owned by{" "}
                                                <UserDetail
                                                    address={owner}
                                                    isLink={true}
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </ul>

                            <div className="flex flex-col-reverse">
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold tracking-tight text-grey-200 sm:text-3xl">
                                        {token.metadata.name}
                                    </h1>
                                    <TokenActionForm
                                        price={tokenPrice}
                                        contract={contract}
                                        tokenId={tokenId}
                                        owner={owner}
                                    />
                                    <Link to={`/series/${contract}`}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                                        >
                                            Go to Series
                                        </button>
                                    </Link>
                                    <h2
                                        id="information-heading"
                                        className="sr-only"
                                    >
                                        Artwork information
                                    </h2>
                                    {/* <h3 className="mt-4 text-base font-medium text-grey-400">
                                        Project #7893
                                    </h3>{" "} */}
                                    {/* TODO DropDown Menu: Report Token */}
                                    <p className="mt-2 text-sm text-grey-400">
                                        Published on {deployTime}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 text-grey-400">
                                {metadata.description}
                            </p>

                            <div className="mt-10 border-t border-grey-900 pt-10">
                                <h3 className="text-sm font-medium text-grey-400">
                                    Share
                                </h3>
                                <ul
                                    role="list"
                                    className="mt-4 flex items-center space-x-6"
                                >
                                    <li>
                                        <a
                                            href="https://app.diyframe.xyz/"
                                            target="_blank"
                                            className="flex h-6 w-6 items-center justify-center text-grey-400 hover:text-grey-500"
                                        >
                                            <span className="sr-only">
                                                Add to DIYFRAME
                                            </span>
                                            <svg
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 30 20"
                                            >
                                                <path
                                                    d=" M 22.597 5.44 L 26.473 5.44 L 26.473 9.317 L 24.773 9.317 L 24.773 7.136 L 22.597 7.136 L 22.597 5.44 Z  M 20.217 13.294 L 20.217 14.261 L 18.762 14.261 L 18.762 15.716 L 17.795 15.716 L 17.795 14.261 L 16.34 14.261 L 16.34 13.294 L 17.795 13.294 L 17.787 11.835 L 18.762 11.835 L 18.762 13.294 L 20.217 13.294 Z  M 23.948 12.123 L 26.665 12.123 L 26.665 23.773 L 21.276 23.773 L 21.276 26 L 9.401 26 L 9.401 16.683 L 13.477 16.683 L 13.477 21.927 L 20.455 21.927 L 20.455 21.059 L 23.948 21.059 L 23.948 12.123 Z  M 21.526 0 L 21.526 6.791 L 12.79 6.791 L 12.798 15.52 L 6.008 15.52 L 6 0 L 21.526 0 Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                            <Tab.Group as="div">
                                <div className="border-b border-grey-900">
                                    <Tab.List className="-mb-px flex space-x-8">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    selected
                                                        ? "border-brand text-brand"
                                                        : "border-transparent text-grey-400 hover:border-grey-300 hover:text-grey-800",
                                                    "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                                                )
                                            }
                                        >
                                            Details
                                        </Tab>
                                    </Tab.List>
                                </div>

                                <Tab.Panels as={Fragment}>
                                    <Tab.Panel className="-mb-10">
                                        <h3 className="sr-only">Details</h3>
                                        <div>
                                            <div className="mt-6 ">
                                                <dl className="divide-y divide-grey-900">
                                                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Re—tain Project ID
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            #7893
                                                        </dd>
                                                    </div> */}

                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Creator
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            <UserDetail
                                                                address={artist}
                                                                isLink={true}
                                                            />
                                                        </dd>
                                                    </div>
                                                    {/* TODO PIERO: Add Name + Profile Link */}
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Owner
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            <UserDetail
                                                                address={owner}
                                                                isLink={true}
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Contract Address
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            <Link
                                                                to={`/series/${contract}`}
                                                            >
                                                                {contract}
                                                            </Link>
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Published
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {deployTime}
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Price
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {formatMutez(price)}
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Primary split
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            100%{" "}
                                                            <a
                                                                href="#"
                                                                className="font-medium text-brand hover:text-red-500"
                                                            >
                                                                <UserDetail
                                                                    address={
                                                                        artist
                                                                    }
                                                                    isLink={
                                                                        true
                                                                    }
                                                                />
                                                            </a>
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Royalties
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {royaltiesTotal}%
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Royalties split
                                                        </dt>

                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {Object.entries(
                                                                royalties
                                                            ).map((r) => (
                                                                <div>
                                                                    {parseInt(
                                                                        r[1]
                                                                    ) / 10}
                                                                    %{" "}
                                                                    <UserDetail
                                                                        address={
                                                                            r[0]
                                                                        }
                                                                        isLink={
                                                                            true
                                                                        }
                                                                    />
                                                                </div>
                                                            ))}
                                                        </dd>
                                                    </div>
                                                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Metadata
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {" "}
                                                            <a
                                                                href="#"
                                                                className="font-medium text-brand hover:text-red-500"
                                                            >
                                                                IPFS
                                                            </a>{" "}
                                                            /{" "}
                                                            <a
                                                                href="#"
                                                                className="font-medium text-brand hover:text-red-500"
                                                            >
                                                                Artifact
                                                            </a>
                                                        </dd>
                                                    </div> */}
                                                </dl>
                                            </div>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel className="text-sm text-grey-500"></Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    } else {
        <Layout>return "Loading...";</Layout>;
    }
}

export default TokenDetail;
