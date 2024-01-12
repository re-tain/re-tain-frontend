import TokenBox from "./TokenBox";
import LoadMoreButton from "./LoadMoreButton";

function TokenGrid({ tokens, loadMore, title, update }) {
    if (tokens && title && loadMore) {
        return (
            <div>
                {tokens.length > 0 && (
                    <div className="bg-black py-24 sm:py-8">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <h2 className="text-3xl  tracking-tight text-white sm:text-4xl">
                                    {title}
                                </h2>
                            </div>
                            <ul
                                role="list"
                                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
                            >
                                {(tokens.length === 0 || !update) && (
                                    <div style={{ marginTop: "5vw" }}>
                                        No tokens found..
                                    </div>
                                )}
                                {tokens.map((token) => {
                                    if (token.metadata)
                                        return (
                                            <TokenBox
                                                id={token.tokenId}
                                                contract={
                                                    token.contract.address
                                                }
                                                title={token.metadata.name}
                                                artifactUri={
                                                    token.metadata.artifactUri
                                                }
                                                displayUri={
                                                    token.metadata.displayUri
                                                }
                                                key={token.metadata.name}
                                                price={token.price}
                                            />
                                        );
                                    return "";
                                })}
                            </ul>
                            <LoadMoreButton loadMore={loadMore} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default TokenGrid;
