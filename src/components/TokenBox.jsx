import Box from "./Box";
import { formatMutez } from "../lib/utils";

function TokenBox({ id, contract, title, artifactUri, displayUri, price }) {
    return (
        <Box
            artifactUri={artifactUri}
            displayUri={displayUri}
            link={`/token-detail/${contract}/${id}`}
            line1={title}
            line2={price ? `${formatMutez(price)}`: ""}
        />
    );
}

export default TokenBox;
