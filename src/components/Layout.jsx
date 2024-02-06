import SyncButton from "./SyncButton";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../lib/wallet";

import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";

import { XMarkIcon, Bars3Icon, BellIcon } from "@heroicons/react/24/outline";

function Layout({ children, favicon = "/favicon.png" }) {
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

    // FUCHS
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const linkList = {
        contact: [
            { name: "Discord", href: "https://discord.com/invite/eDqaCTrWbF" },
            { name: "Twitter", href: "https://twitter.com/re_tain_xyz" },
            {
                name: "Instagram",
                href: "https://www.instagram.com/re_tain_xyz/",
            },
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/company/98404044/",
            },
            { name: "Email", href: "mailto:andre@andrefuchs.xyz" },
        ],
        support: [
            {
                name: "Onboarding",
                href: "https://blog.re-tain.xyz/artist-onboarding/",
            },
            { name: "FAQ", href: "https://blog.re-tain.xyz/#faq" },
            { name: "Documentation", href: "https://blog.re-tain.xyz/#docs" },
            { name: "Guides", href: "https://blog.re-tain.xyz/#guides" },
        ],
        company: [
            { name: "About", href: "https://blog.re-tain.xyz/about-us/" },
            { name: "Blog", href: "https://blog.re-tain.xyz/" },
            {
                name: "Newsletter",
                href: "https://creativecoding.substack.com/",
            },
            { name: "Press Kit", href: "https://blog.re-tain.xyz/press-kit/" },
        ],
        legal: [
            { name: "Terms", href: "https://blog.re-tain.xyz/terms" },
            { name: "Privacy", href: "https://blog.re-tain.xyz/privacy" },
            { name: "Report a token", href: "https://blog.re-tain.xyz/report" },
        ],
        social: [
            {
                name: "Twitter",
                href: "https://twitter.com/re_tain_xyz",
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                ),
            },

            {
                name: "Discord",
                href: "https://discord.com/invite/eDqaCTrWbF",
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 50 50" {...props}>
                        <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z" />
                    </svg>
                ),
            },
            {
                name: "Instagram",
                href: "https://www.instagram.com/re_tain_xyz/",
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
            },
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/company/98404044/",
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 50 50" {...props}>
                        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                    </svg>
                ),
            },
        ],
    };

    const openNewsletter = () => {
        window.open("https://creativecoding.substack.com/", "_blank");
    };

    const tzktLink = [{ name: "Built with TzKT API", href: "https://tzkt.io" }];

    return (
        <div
            style={{
                paddingLeft: "10vw",
                paddingRight: "10vw",
                minHeight: "100vh",
                margin: 0,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
            }}
        >
            <header>
                <div className="bg-black">
                    <div className="flex items-center gap-x-6 bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <p className="text-sm leading-6 text-grey-400">
                                <strong className="font-semibold ">
                                    Private Testnet Alpha Version 1.0
                                </strong>
                                <svg
                                    viewBox="0 0 2 2"
                                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                                    aria-hidden="true"
                                ></svg>
                            </p>
                            <a
                                href="https://blog.re-tain.xyz/private-alpha"
                                target="_blank"
                                className="flex-none rounded-full bg-grey-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-grey-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-900"
                            >
                                Learn More
                            </a>
                        </div>

                        <div className="flex flex-1 justify-end">
                            {/* 
      #FUTURE
    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
      <span className="sr-only">Dismiss</span>
      <XMarkIcon className="h-5 w-5 text-grey-400" aria-hidden="true" />
    </button>
    */}
                        </div>
                    </div>

                    <div className="w-full border-t border-grey-600" />
                    <Disclosure as="nav" className="bg-black">
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                                    <div className="relative flex h-16 items-center justify-between">
                                        <div className="flex items-center px-2 lg:px-0">
                                            <div className="flex-shrink-0">
                                                <a href="/">
                                                    <img
                                                        className="h-6 w-auto"
                                                        src="https://blog.re-tain.xyz/Re%E2%80%94tain_Logo_Color-F0FF42.svg"
                                                        alt="Your Company"
                                                    />
                                                </a>
                                            </div>

                                            <div className="hidden lg:ml-6 lg:block">
                                                <div className="flex space-x-4">
                                                    {/* Current: "bg-grey-900 text-white", Default: "text-grey-300 hover:bg-grey-700 hover:text-white" */}
                                                    <a
                                                        href="/series-overview"
                                                        className="rounded-md bg-grey-800 px-3 py-2 text-sm font-medium text-white"
                                                    >
                                                        Explore
                                                    </a>
                                                    <a
                                                        href="https://blog.re-tain.xyz/artist-onboarding/#docs"
                                                        target="_blank"
                                                        className="rounded-md px-3 py-2 text-sm font-medium text-grey-300 hover:bg-grey-700 hover:text-white"
                                                    >
                                                        Docs
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex lg:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-grey-400 hover:bg-grey-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                        <div className="hidden lg:ml-4 lg:block">
                                            <div className="flex items-center">
                                                <SyncButton />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TODO PIERO: MOBILE NAV in SYNCBUTTON.JSX? */}

                                <Disclosure.Panel className="lg:hidden">
                                    <div className="border-t border-grey-700 pb-3 pt-4">
                                        <SyncButton isMobile={true} />

                                        <div className="mt-3 space-y-1 px-2">
                                            <Disclosure.Button
                                                as="a"
                                                href="/deploy"
                                                className="block rounded-md px-3 py-2 text-base font-medium text-grey-400 hover:bg-grey-700 hover:text-white"
                                            >
                                                Mint Generative Token
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                as="a"
                                                href={`/user/${activeAccount}`}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-grey-400 hover:bg-grey-700 hover:text-white"
                                            >
                                                Your Collection
                                            </Disclosure.Button>
                                            <Disclosure.Button
                                                as="a"
                                                href="#"
                                                className="block rounded-md px-3 py-2 text-base font-medium text-grey-400 hover:bg-grey-700 hover:text-white"
                                            >
                                                Sign out
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </header>
            <div
                className="content"
                style={{
                    marginTop: "5vh",
                }}
            >
                {children}
            </div>
            <footer className="bg-black ">
                <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-4">
                    <div className="mt-10 flex justify-center space-x-10">
                        <div className="flex space-x-16 md:order-2 mt-10">
                            {linkList.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    className="text-brand hover:text-grey-400"
                                >
                                    <item.icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 w-full border-t border-grey-600" />
                    <div className="mt-16 xl:grid xl:grid-cols-3 xl:gap-8">
                        <a href="#">
                            <img
                                className="h-7"
                                src="https://blog.re-tain.xyz/Re%E2%80%94tain_Logo_Color-F0FF42.svg"
                                alt="Re-tain"
                                title="Go to top"
                            />
                        </a>

                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Contact
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {linkList.contact.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    className="text-sm leading-6 text-grey-300 hover:text-brand"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Support
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {linkList.support.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    className="text-sm leading-6 text-grey-300 hover:text-brand"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Re—tain
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {linkList.company.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    className="text-sm leading-6 text-grey-300 hover:text-brand"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-white">
                                        Legal
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {linkList.legal.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    className="text-sm leading-6 text-grey-300 hover:text-brand"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-sm font-semibold leading-6 text-white">
                                Subscribe to our{" "}
                                <span className="text-grey-300">
                                    <a
                                        href="https://creativecoding.substack.com/"
                                        target="_blank"
                                    >
                                        free newsletter
                                    </a>
                                </span>
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-grey-300">
                                Get the latest news, articles, and resources,
                                sent to your inbox weekly.
                            </p>
                        </div>

                        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                            <button
                                onClick={openNewsletter}
                                className="flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
                        <div className="flex space-x-6 md:order-2">
                            {tzktLink.map((item) => (
                                <div key={item.name} className="">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        className="mt-8 text-xs leading-5 text-grey-500 md:order-1 md:mt-"
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-xs leading-5 text-grey-200 md:order-1 md:mt-0">
                            &copy; 2024 Re—tain: Generative Art Marketplace on
                            Tezos
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
