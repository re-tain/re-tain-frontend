import { useEffect, useState } from "react";

import { getContractMetadata, getContractStorage, getToken } from "../lib/api";

import Box from "./Box";
import UserDetail from "./UserDetail";

function SeriesBox({ contract }) {
    const [artifactUri, setArtifactUri] = useState(null);
    const [displayUri, setDisplayUri] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract, 0);
            setArtifactUri(token?.metadata.artifactUri);
            setDisplayUri(token?.metadata.displayUri);
            setMetadata(await getContractMetadata(contract));
            setArtist(await getContractStorage(contract, 'artist_address'));
        };

        fetchToken().catch(console.error);
    }, [contract]);
    if (metadata && artist) {
        return (
            <Box
                artifactUri={artifactUri}
                displayUri={displayUri}
                link={`/series/${contract}`}
                line1={metadata.name}
                line2={<span>by <UserDetail address={artist} isLink={true}/></span>}
            />
        );
    }
}

export default SeriesBox;
