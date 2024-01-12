import { Link, useParams } from "react-router-dom";

import Layout from "./Layout";

import { Fragment, useContext, useEffect, useState } from "react";

import { getContractStorage, getContractMetadata, getContractStorageFull } from "../lib/api";
import UserDetail from "./UserDetail";
import Mint from "./Mint";
import { extractTokensForOverview, formatMutez, resolveIpfs } from "../lib/utils";

import TokenOverview from "./TokenOverview";
import { originateContractFromExisting, WalletContext } from "../lib/wallet";
import MarketPlace from "./Marketplace";
import { ENV } from "../consts";
import LiveViewIFrame from "./LiveViewIFrame";
import PrevNextForm from "./PrevNextForm";
import { bytes2Char } from "@taquito/utils";

// FUCHS
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { CheckBadgeIcon, } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'

const artworkIterations = [
  {
    name: 'Sabler #22',
    role: 'ciyphrd',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmVJAk6xKtTpvNg6qJeV2gLxTSmab58LKWZREh3CJ6B4s4',
    location: 'Toronto, Canada',
  },

  {
    name: 'Sabler #122',
    role: 'oenx',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmYGGceA6h76fA2dbixp9kgmDVHH3Q1RJx6fGs7mGr1FD6',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #102',
    role: 'pifragle',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmYkRjBQtCL47YbJiRmtyEdVhvyHtcXxcPcyiRw6aJKQJG',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #302',
    role: 'andrefuchs.tez',
    imageUrl:
      'https://media.fxhash.xyz/w_256/Qmem3kAF4JEF3Vi1Bgyjtnq9HcZeoFhxVVJjXQX3kJokQm',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #90',
    role: 'EnterpriseSaaS',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmNvf3dS9THRRECNsBUYpeo6xFHJwUMuSKFDnC4mvzfZgb',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #172',
    role: 'nudoro',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmQBXEvkBvBxmQSKFqWoevqy9QPgbrmTvwnXJiBmf1aSPP',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #1',
    role: 'tz1cRTH...VfeMgn2',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmNvf3dS9THRRECNsBUYpeo6xFHJwUMuSKFDnC4mvzfZgb',
    location: 'Toronto, Canada',
  },
  {
    name: 'Sabler #233',
    role: 'Iced 3DManatee',
    imageUrl:
      'https://media.fxhash.xyz/w_256/QmSd3dYAFyHAAZm7Xs4XJqAqYnQzzwSDNZ1WCVkGgPcEQV',
    location: 'Toronto, Canada',
  },
]

const artworkArtist = [
  {
    name: 'Studio Yorktown',
    title: '@studioyorktown • studioyorktown.com',
    role: 'Verified',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1545668047691735040/oHha-3Op_400x400.png',
  }
]

const artwork = {
  name: 'Sabler',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  price: 'Mint selected',
  description: '\'Sabler\', an anagram of \'Albers\',  is a generative homage to the work of the Bauhaus textile artist Anni Albers.',
  imageSrc: 'https://images.squarespace-cdn.com/content/v1/60d1dd51ca008f2f908cbc2f/c8c81334-cdd3-4dd9-abf9-4d3d679e9937/Sabler.png?format=750w',
  imageAlt: 'Sabler',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
  const [hash, setHash] = useState('000000000000000000000000000000');

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getContractStorageFull(contract);
      setPrice(storage.price);
      setNumTokens(storage.num_tokens);
      setNumTokensMinted(storage.last_token_id);
      setPaused(storage.paused);
      setArtist(storage.artist_address);
      setBaseUrl(bytes2Char(storage.base_url));
      setMetadata(await getContractMetadata(contract));
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
        ARTIST PANEL: EDIT TOKEN
        {activeAccount === artist && (
          <div className="token-detail-width">
            <Link to={`/artist-panel/${contract}`}>
              <button className="btn btn-default" style={{ width: '100%', marginTop: "2vh" }}>
                Go to artist panel
              </button>
            </Link>
          </div>
        )}

        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          {/* Drop */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Drop image */}
            <div className="lg:col-span-4 lg:row-end-1">
              <a href="#ipfsview" target='_blank'>
                <div className=" aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-black">
                  {/* TODO: a href auf IPFS  */}
                  <img src={artwork.imageSrc} alt={artwork.imageAlt} className="object-contain object-center" />
                </div>
              </a>
            </div>

            {/* Drop details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <ul role="list" className="grid grid-cols-1 gap-6">
                {artworkArtist.map((person) => (
                  <div className="flex w-full items-center justify-between space-x-6 ">
                    <img className="h-10 w-10 flex-shrink-0 rounded-full bg-grey-400" src={person.imageUrl} alt="" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-xl font-medium text-grey-200">{person.name}</h3>
                        <span className="inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ">
                          <CheckBadgeIcon className="text-brand w-6 h-6"></CheckBadgeIcon>
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-grey-400">{person.title}</p>
                    </div>
                  </div>
                ))}
              </ul>

              <div className="flex flex-col-reverse">
                <div className="mt-4">

                  <h1 className="text-2xl font-bold tracking-tight text-grey-200 sm:text-3xl">{artwork.name}</h1>
                  <p className="mt-4"><span className="text-lg  text-brand">85/100 </span> <span className="text-lg text-grey-400">minted</span>  <span className="text-lg text-brand justify-end">ꜩ 32</span></p>
                  <div className="mt-2" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-grey-400">
                      <div className="h-2 rounded-full bg-brand" style={{ width: '85.0%' }} />
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border  bg-transparent px-8 py-3 text-base font-medium text-brand hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                    >
                      <ArrowPathIcon className="text-brand mr-3 w-6 h-6"></ArrowPathIcon>      Randomize
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                    >
                      {artwork.price}
                    </button>
                  </div>

                  <h2 id="information-heading" className="sr-only">
                    Artwork information
                  </h2>
                  <h3 className="mt-4 text-base font-medium text-grey-400">Project #7893</h3>  {/* TODO DropDown Menu: Report Token */}
                  <p className="mt-2 text-sm text-grey-400">
                    Published on {artwork.version.date} at 00:14
                  </p>
                </div>
              </div>

              <p className="mt-6 text-grey-400">{artwork.description}</p>

              <div className="mt-10 border-t border-grey-900 pt-10">
                <h3 className="text-sm font-medium text-grey-400">Share</h3>
                <ul role="list" className="mt-4 flex items-center space-x-6">
                  <li>
                    <a href="https://app.diyframe.xyz/" target="_blank" className="flex h-6 w-6 items-center justify-center text-grey-400 hover:text-grey-500">

                      <span className="sr-only">Add to DIYFRAME</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 30 20">
                        <path
                          d=" M 22.597 5.44 L 26.473 5.44 L 26.473 9.317 L 24.773 9.317 L 24.773 7.136 L 22.597 7.136 L 22.597 5.44 Z  M 20.217 13.294 L 20.217 14.261 L 18.762 14.261 L 18.762 15.716 L 17.795 15.716 L 17.795 14.261 L 16.34 14.261 L 16.34 13.294 L 17.795 13.294 L 17.787 11.835 L 18.762 11.835 L 18.762 13.294 L 20.217 13.294 Z  M 23.948 12.123 L 26.665 12.123 L 26.665 23.773 L 21.276 23.773 L 21.276 26 L 9.401 26 L 9.401 16.683 L 13.477 16.683 L 13.477 21.927 L 20.455 21.927 L 20.455 21.059 L 23.948 21.059 L 23.948 12.123 Z  M 21.526 0 L 21.526 6.791 L 12.79 6.791 L 12.798 15.52 L 6.008 15.52 L 6 0 L 21.526 0 Z" fill="currentColor"
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
                            ? 'border-brand text-brand'
                            : 'border-transparent text-grey-400 hover:border-grey-300 hover:text-grey-800',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
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
                            <dt className="text-sm font-medium leading-6 text-grey-400">Re—tain Project ID</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">#7893</dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Contract Address</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrX</dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Published</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">June 5, 2021 at 00:14 (24 hours ago)</dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Price</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">ꜩ32</dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Primary split</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">100% <a href="#" className="font-medium text-brand hover:text-red-500">
                              Studio Yorktown
                            </a></dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Royalties</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">15.0%</dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Royalties split</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0">100%  <a href="#" className="font-medium text-brand hover:text-red-500">
                              Studio Yorktown
                            </a></dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-grey-400">Metadata</dt>
                            <dd className="mt-1 text-sm leading-6 text-grey-400 sm:col-span-2 sm:mt-0"> <a href="#" className="font-medium text-brand hover:text-red-500">
                              IPFS</a> / <a href="#" className="font-medium text-brand hover:text-red-500">
                                Artifact</a></dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </Tab.Panel>

                  <Tab.Panel className="text-sm text-grey-500">
                    <dl>
                      <ul role="list" className="grid grid-cols-1 gap-6">
                        {artworkArtist.map((person) => (
                          <div className="mt-6 flex w-full items-center justify-between space-x-6 ">
                            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-grey-300" src={person.imageUrl} alt="" />
                            <div className="flex-1 truncate">
                              <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-medium text-grey-400">{person.name}</h3>
                                <span className="inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ">
                                  <CheckBadgeIcon className="w-6 h-6"></CheckBadgeIcon>
                                </span>
                              </div>
                              <p className="mt-1 truncate text-sm text-grey-500">{person.title}</p>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </dl>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>

        <div className="bg-black py-24 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl  tracking-tight text-white sm:text-4xl">Iterations</h2>
            </div>
            <ul
              role="list"
              className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
            >
              {artworkIterations.map((person) => (
                <li key={person.name}>
                  <a href="/token-detail/KT1G4e969gWPugGZw3apZszC2mvfvykD1S9t/3"><img className="border border-grey-700  aspect-[14/13] w-full  object-cover" src={person.imageUrl} alt="" /></a>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white"><a href="/token-detail/KT1G4e969gWPugGZw3apZszC2mvfvykD1S9t/3">{person.name}</a></h3>
                  <p className="text-base leading-7 text-grey-300"><a href="/user/andrefuchs">{person.role}</a></p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
        PREVIEW MINT IMG
        <div>
          <div>
            <b>{metadata.name}</b>
          </div>
          <div>
            by <UserDetail address={artist} isLink={true} />
          </div>
        </div>
        <br />

        <div className="token-detail-width token-detail-height">
          <LiveViewIFrame url={`${baseUrl}?hash=${hash}`} />
        </div>

        <div style={{ marginTop: "1vh", whiteSpace: "pre-wrap" }}>
          {metadata.description}
        </div>
        <br />


        TOKEN LEFT
        <div className="token-detail-width" >
          <div style={{ margin: "0 0 1vh 0" }}>
            {numTokensMinted} / {numTokens} minted | {formatMutez(price)}
          </div>
          <PrevNextForm setHash={setHash} />
          <div style={{ margin: "0vh 0 0vh 0" }}>
            <Mint
              contract={contract}
              price={price}
              active={
                numTokensMinted !== numTokens &&
                (activeAccount === artist || !paused)
              }
              hash={hash}
            />
          </div>
        </div>

      {activeAccount === artist && ENV !== "prod" && (
                    <button
                        className="btn btn-default"
                        onClick={handleDeployToMainnet}
                    >
                        Deploy to mainnet
                    </button>
                )} 

        MARKETPLACE / ON SALE
        <div style={{ marginTop: "3vh" }}>
          <MarketPlace contract={contract}></MarketPlace>
        </div>

        MINTED TOKENS / ITERATIONS
        <div style={{ marginTop: "5vh" }}>
          <h1>All tokens</h1>

          <TokenOverview
            query={`v1/tokens?contract=${contract}`}
            pageLength={30}
            extractTokens={extractTokensForOverview}
          ></TokenOverview>

        </div>
        */}

      </Layout>
    );
  } else {
    return <Layout>— Loading...</Layout>;
  }
}

export default Series;