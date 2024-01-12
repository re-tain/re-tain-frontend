import { useContext, useState, useEffect, Fragment } from "react";
import { WalletContext } from "../lib/wallet";
import { TEZOS_NETWORK } from "../consts";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserDetail from "./UserDetail";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function SyncButton() {
    const client = useContext(WalletContext).client;

    const [activeAccount, setActiveAccount] = useState(null);

    useEffect(() => {
        const func = async () => {
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };
        func();
    }, [client]);

    let connect = async () => {
        let account = await client.getActiveAccount();
        if (!account) {
            await client.requestPermissions({
                network: { type: TEZOS_NETWORK },
            });
            account = await client.getActiveAccount();
            setActiveAccount(account);
        }
    };

    let disconnect = async () => {
        await client.disconnect();
        setActiveAccount(null);
    };

    return (
        <div>
            {!activeAccount && (
                <button
                    onClick={connect}
                    title="Connect Wallet"
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Sync to Login
                </button>
            )}
            {activeAccount && (
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-grey-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grey-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserDetail address={activeAccount} imgOnly={true}/>
                            <ChevronDownIcon
                                className="h-6 w-6 text-grey-400"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/deploy"
                                        className={classNames(
                                            active ? "bg-brand" : "",
                                            "block px-4 py-2  font-semibold text-sm text-black"
                                        )}
                                    >
                                        Mint Generative Token
                                    </a>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={`/user/${activeAccount}`}
                                        className={classNames(
                                            active ? "bg-brand" : "",
                                            "block px-4 py-2 text-sm text-grey-600"
                                        )}
                                    >
                                        Your Collection
                                    </a>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={disconnect}
                                        className={classNames(
                                            active ? "bg-brand" : "",
                                            "block px-4 py-2 text-sm text-grey-400"
                                        )}
                                    >
                                        Sign out
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </div>
    );
}

export default SyncButton;
