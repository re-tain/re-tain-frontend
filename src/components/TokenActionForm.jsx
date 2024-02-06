import { WalletContext, buy, list, cancelListing } from "../lib/wallet";
import { useContext, useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { formatMutez } from "../lib/utils";

function TokenActionForm({ contract, tokenId, price, owner }) {
    const wallet = useContext(WalletContext);
    const [activeAccount, setActiveAccount] = useState(null);

    useEffect(() => {
        const func = async () => {
            const account = await wallet.client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };
        func();
    }, [wallet]);

    const handleBuy = async (e) => {
        e.preventDefault();
        await buy(wallet, contract, tokenId, price);
    };

    const handleList = async (e) => {
        e.preventDefault();
        console.log(e);
        let price = parseFloat(e.target[0].value);
        await list(wallet, contract, tokenId, price * 1000000);
    };

    const handleCancelListing = async (e) => {
        e.preventDefault();
        await cancelListing(wallet, contract, tokenId);
    };
    return (
        <div>
            {price && activeAccount !== owner && (
                <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                    onCLick={handleBuy}
                >
                    <ShoppingCartIcon className="text-black mr-3 w-6 h-6"></ShoppingCartIcon>
                    Purchase token - {formatMutez(price)}
                </button>
            )}
            {activeAccount === owner && (
                <div>
                    {!price && (
                        <form
                            className="mt-5 sm:flex sm:items-center"
                            onSubmit={handleList}
                        >
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
                        </form>
                    )}

                    {price && (
                        <button
                            onClick={handleCancelListing}
                            type="submit"
                            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-grey-50"
                        >
                            Cancel Listing
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default TokenActionForm;
