import Box from "./Box";
import { formatMutez } from "../lib/utils";
import UserDetail from "./UserDetail";

function TokenBox({
    id,
    contract,
    title,
    artifactUri,
    displayUri,
    price,
    artist,
}) {
    return (
        <Box
            artifactUri={artifactUri}
            displayUri={displayUri}
            link={`/token-detail/${contract}/${id}`}
            line1={title}
            line2={
                price ? (
                    `${formatMutez(price)}`
                ) : (
                    <span>
                        by <UserDetail address={artist} isLink={true} />
                    </span>
                )
            }
        />
    );
}

export default TokenBox;
