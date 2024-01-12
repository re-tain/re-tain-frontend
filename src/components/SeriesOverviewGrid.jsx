import LoadMoreButton from "./LoadMoreButton";
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

const artistDemoLayout = [
    {
        name: "Andre Fuchs",
        email: "andrefuchs.tez",
        role: "Co-Founder / CEO",
        imageUrl: "https://andrefuchs.xyz/avatar.png",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
];

const productsDemoLayout = [
    {
        id: 1,
        name: "TIDE",
        price: "ꜩ149",
        rating: 5,
        reviewCount: 38,
        imageSrc: "https://andrefuchs.xyz/nft/nft_002.png",
        imageAlt: "TODO",
        href: "#",
    },
    {
        id: 2,
        name: "AERO",
        price: "ꜩ15",
        rating: 5,
        reviewCount: 18,
        imageSrc: "https://andrefuchs.xyz/nft/nft_003.png",
        imageAlt: "TODO",
        href: "#",
    },
    {
        id: 3,
        name: "TRACTION",
        price: "ꜩ5",
        rating: 5,
        reviewCount: 14,
        imageSrc: "https://andrefuchs.xyz/nft/nft_004.png",
        imageAlt: "TODO",
        href: "#",
    },
    {
        id: 4,
        name: "ARCH",
        price: "ꜩ25",
        rating: 4,
        reviewCount: 21,
        imageSrc: "https://andrefuchs.xyz/nft/nft_005.png",
        imageAlt: "TODO",
        href: "#",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function SeriesOverviewGrid({ children, loadMore }) {
    return (
        <>
            <main className="pb-12 bg-black">
                <section className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8 ">
                    <div className="-mx-px grid grid-cols-2 border-l border-grey-700 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 border-t border-grey-600">
                        {children}
                    </div>
                </section>

                <nav
                    aria-label="Pagination"
                    className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-grey-700 sm:px-6 lg:px-8"
                >
                    <LoadMoreButton loadMore={loadMore} />
                </nav>
            </main>
        </>
        // <div>
        //     <div
        //         style={{
        //             display: "flex",
        //             flexWrap: "wrap",
        //         }}
        //     >
        //         {children}
        //     </div>
        //     {/* {children.length === 0 && (
        //         <div style={{ marginTop: "5vw" }}>No tokens found..</div>
        //     )} */}
        //     <LoadMoreButton loadMore={loadMore} />
        // </div>
    );
}

export default SeriesOverviewGrid;
