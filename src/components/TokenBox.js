import Box from "./Box";
function TokenBox({ id, contract, title, artifactUri, displayUri, price }) {
    return (
        <Box
            artifactUri={artifactUri}
            displayUri={displayUri}
            link={`/token-detail/${contract}/${id}`}
            line1={title}
            line2={price ? `ꜩ ${price / 1000000}`: ""}
        />
    );
}

export default TokenBox;
