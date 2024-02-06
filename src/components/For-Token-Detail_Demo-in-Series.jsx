import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";

import { Fragment, useContext, useEffect, useState } from "react";

import {
    getContractStorage,
    getContractMetadata,
    getContractStorageFull,
    getContract,
} from "../lib/api";
import UserDetail from "./UserDetail";
import Mint from "./Mint";
import {
    extractTokensForOverview,
    formatDate,
    formatMutez,
    resolveIpfs,
} from "../lib/utils";

import TokenOverview from "./TokenOverview";
import { originateContractFromExisting, WalletContext } from "../lib/wallet";
import MarketPlace from "./Marketplace";
import { ENV } from "../consts";
import LiveViewIFrame from "./LiveViewIFrame";
import PrevNextForm from "./PrevNextForm";
import { bytes2Char } from "@taquito/utils";
import { Tab } from "@headlessui/react";

// FUCHS
import {  ShoppingCartIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const artworkArtist = [
    {
        name: "Studio Yorktown",
        title: "@studioyorktown • studioyorktown.com",
        role: "Verified",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        imageUrl:
            "https://pbs.twimg.com/profile_images/1545668047691735040/oHha-3Op_400x400.png",
    },
];

/* const artwork = {
    name: "Sabler",
    version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
    price: "Mint selected",
    description:
        "'Sabler', an anagram of 'Albers',  is a generative homage to the work of the Bauhaus textile artist Anni Albers.",
    imageSrc:
        "https://images.squarespace-cdn.com/content/v1/60d1dd51ca008f2f908cbc2f/c8c81334-cdd3-4dd9-abf9-4d3d679e9937/Sabler.png?format=750w",
    imageAlt: "Sabler",
}; */

function Series() {
    const wallet = useContext(WalletContext);
    const client = wallet.client;
    let { contract } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [numTokens, setNumTokens] = useState(null);
    const [price, setPrice] = useState(null);
    const [numTokensMinted, setNumTokensMinted] = useState(null);
    const [artist, setArtist] = useState(null);
    const [activeAccount, setActiveAccount] = useState(null);
    const [paused, setPaused] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);
    const [hash, setHash] = useState("00000000000000000000000000000000");
    const [royalties, setRoyalties] = useState(null);
    const [royaltiesTotal, setRoyaltiesTotal] = useState(null);
    const [deployTime, setDeployTime] = useState(null);

    useEffect(() => {
        const fetchStorage = async () => {
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
            setNumTokens(storage.num_tokens);
            setNumTokensMinted(storage.last_token_id);
            setPaused(storage.paused);
            setArtist(storage.artist_address);
            setBaseUrl(bytes2Char(storage.base_url));
            const metadata = await getContractMetadata(contract);
            setMetadata(metadata);
            const contractData = await getContract(contract);
            console.log(contractData);
            setDeployTime(formatDate(contractData.firstActivityTime));
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };

        fetchStorage().catch(console.error);
    }, [contract, client]);

    const handleDeployToMainnet = async () => {
        await originateContractFromExisting(wallet, contract, "mainnet");
    };

    if (numTokens && metadata && baseUrl) {
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
                                        url={`${baseUrl}?hash=${hash}`}
                                    />
                                </div>
                            </a>
                        </div>

                        {/* Drop details */}
                        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                         

                            <ul role="list" className="grid grid-cols-1 gap-6">
                            
                            <div className="flex w-full items-center justify-between space-x-6 ">
                                    <img
                                        className="h-10 w-10 flex-shrink-0 rounded-full bg-grey-400"
                                        src="https://andrefuchs.xyz/avatar.png"
                                        alt=""
                                    />
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-l font-medium text-grey-200">
                                                Created by -Artist Name as link to profile-
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="flex w-full items-center justify-between space-x-6 ">
                                    <img
                                        className="h-10 w-10 flex-shrink-0 rounded-full bg-grey-400"
                                        src="https://pbs.twimg.com/profile_images/1545668047691735040/oHha-3Op_400x400.png"
                                        alt=""
                                    />
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-l font-medium text-grey-200">
                                                Owned by -Collector Name as link to profile-
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                
                            </ul>  

                            <div className="flex flex-col-reverse">
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold tracking-tight text-grey-200 sm:text-3xl">
                                      
                                        {/* TODO PIERO: Set ID: */}
                                         {metadata.name} #tokenID
                                    </h1>


                            {/*        <p className="mt-4">
                                        <span className="text-lg  text-brand">
                                            {numTokensMinted} / {numTokens}{" "}
                                        </span>{" "}
                                       <span className="text-lg text-grey-400">
                                            minted
                                        </span>{" "}
                                        <span className="text-lg text-brand justify-end">
                                            {formatMutez(price)}
                                        </span>
                                    </p> */}
                                    
                               {/*      <div className="mt-2" aria-hidden="true">
                                        <div className="overflow-hidden rounded-full bg-grey-400">
                                            <div
                                                className="h-2 rounded-full bg-brand"
                                                style={{ width: "85.0%" }}
                                            />
                                        </div>
                                    </div> */}


{/* FUCHS NOTE: if available for sale */}
                                    <button
                                        type="button"
                                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                                        >
                                        < ShoppingCartIcon className="text-black mr-3 w-6 h-6"></ ShoppingCartIcon>Purchase token - ꜩ 42
                                    </button>

{/* FUCHS NOTE: if owner and NOT for sale */}

<form className="mt-5 sm:flex sm:items-center">
   
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
                                                className="w-200 rounded-md border-0 py-1.5 pl-7 pr-12 bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
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
    

      <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
              List Token
          </button>

            {/* TODO PIERO: 
            FUCHS NOTE: if owner + listed:       
          
            <button
            type="submit"
            className="ml-3 inline-flex w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
         >
            Cancel Listing
            </button>
 */}


        </form>



                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                        <PrevNextForm setHash={setHash} />

                                        <Mint
                                            contract={contract}
                                            price={price}
                                            active={
                                                numTokensMinted !== numTokens &&
                                                (activeAccount === artist ||
                                                    !paused)
                                            }
                                            hash={hash}
                                        />
                                    </div>
                                    <h2
                                        id="information-heading"
                                        className="sr-only"
                                    >
                                        Artwork information
                                    </h2>
                                    <h3 className="mt-4 text-base font-medium text-grey-400">
                                        Project #7893
                                    </h3>{" "}
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
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Re—tain Project ID
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            #7893
                                                        </dd>
                                                    </div>

{/* TODO PIERO: Add Name + Profile Link */}
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Creator
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                           -Artist Name- (als link)
                                                        </dd>
                                                    </div>
{/* TODO PIERO: Add Name + Profile Link */}
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Owner
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                           -Collector Name- (als link)
                                                        </dd>
                                                    </div>


                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-grey-400">
                                                            Contract Address
                                                        </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">
                                                            {contract}
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
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
                                                    </div>
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

                <div style={{ marginTop: "3vh" }}>
                    <MarketPlace contract={contract}></MarketPlace>
                </div>

                <TokenOverview
                    query={`v1/tokens?contract=${contract}`}
                    pageLength={30}
                    extractTokens={extractTokensForOverview}
                    title={"Iterations"}
                ></TokenOverview>
            </Layout>
        );
    } else {
        {
            /* add state: if nothing listed yet */
        }
        return <Layout>Loading...</Layout>;
    }
}

export default Series;
