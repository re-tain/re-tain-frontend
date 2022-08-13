import { useEffect, useState } from "react";

import { getContractMetadata, getToken } from "../lib/api";

import Box from "./Box";

function SeriesBox({ contract, author }) {
    const [artifactUri, setArtifactUri] = useState(null);
    const [displayUri, setDisplayUri] = useState(null);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract, 0);
            setArtifactUri(token.metadata.artifactUri);
            setDisplayUri(token.metadata.displayUri);
            setMetadata(await getContractMetadata(contract));
        };

        fetchToken().catch(console.error);
    }, [contract]);
    if (metadata && artifactUri) {
        return (
            <Box
                artifactUri={artifactUri}
                displayUri={displayUri}
                link={`/series/${contract}`}
                line1={metadata.name}
                line2={`by ${author}`}
            />
        );
    }
}

export default SeriesBox;
