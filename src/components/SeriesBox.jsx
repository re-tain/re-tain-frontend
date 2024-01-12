import { useEffect, useState } from "react";

import { getContractMetadata, getContractStorage, getToken } from "../lib/api";

import Box from "./Box";
import UserDetail from "./UserDetail";
import TokenImage from "./TokenImage";
import { formatMutez } from "../lib/utils";
import { Link } from "react-router-dom";

function SeriesBox({ contract }) {
    const [artifactUri, setArtifactUri] = useState(null);
    const [displayUri, setDisplayUri] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [artist, setArtist] = useState(null);
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract.address, 0);
            console.log(token);
            setArtifactUri(token?.metadata.artifactUri);
            setDisplayUri(token ? token.metadata.displayUri : "1000");
            setMetadata(await getContractMetadata(contract.address));
            setArtist(contract.storage.artist_address);
            setStorage(contract.storage);
        };

        fetchToken().catch(console.error);
    }, [contract]);
    if (metadata && artist) {
        return (
            <div className="group relative border-b border-r border-grey-700 p-4 sm:p-6">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-grey-700 group-hover:opacity-75">
                    <div className="h-full w-full object-cover object-center">
                        <Link to={`/series/${contract.address}`}>
                            {" "}
                            <TokenImage displayUrl={displayUri} />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col-reverse">
                    <div className="mt-4">
                        <h1 className="text-xl font-bold tracking-tight text-grey-400 sm:text-2xl">
                            {metadata.name}
                        </h1>
                        <UserDetail address={artist} detail={false} />

                        <p className="mt-1">
                            <span className="text-lg  text-brand">
                                {storage.last_token_id}/{storage.num_tokens}
                            </span>{" "}
                            <span className="text-lg text-grey-400">
                                minted
                            </span>{" "}
                            <span className="text-lg  text-brand">
                                {formatMutez(storage.price)}
                            </span>{" "}
                        </p>
                        <div className="mt-2" aria-hidden="true">
                            <div className="overflow-hidden rounded-full bg-grey-200">
                                <div
                                    className="h-1 rounded-full bg-brand"
                                    style={{ width: "85.0%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SeriesBox;
