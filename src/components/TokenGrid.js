import TokenBox from "./TokenBox";
import PaginationButtons from "./PaginationButtons";

function TokenGrid({ tokens, previousPage, nextPage }) {
    return (
        <div>
            {tokens.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {tokens.map((token) => {
                        if (token.metadata)
                            return (
                                <TokenBox
                                    title={token.metadata.name}
                                    url={token.metadata.artifactUri}
                                    key={token.metadata.name}
                                    price={token.price}
                                />
                            );
                            return ""
                    })}
                </div>
            )}
            {tokens.length === 0 && (
                <div style={{ marginTop: "5vw" }}>No tokens found..</div>
            )}
            <PaginationButtons
                previousPage={previousPage}
                nextPage={nextPage}
            />
        </div>
    );
}

export default TokenGrid;
