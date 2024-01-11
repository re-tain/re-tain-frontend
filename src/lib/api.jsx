import { TZKT_API } from "../consts";
import { bytes2Char } from "@taquito/utils";
import { resolveIpfs } from "./utils";

export async function getContract(contract) {
    let query = `v1/contracts/${contract}`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    return data;
}

export async function getToken(contract, tokenId) {
    let query = `v1/tokens/?contract=${contract}&tokenId=${tokenId}`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    if (data.length > 0) {
        return data[0];
    } else {
        return null;
    }
}

export async function getContractStorageFull(contract) {
    let query = `v1/contracts?address=${contract}&includeStorage=true`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    console.log(data);
    return data[0].storage;
}

export async function getContractStorage(contract, key) {
    let query = `v1/contracts/${contract}/storage?path=${key}`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    return data;
}

export async function getContractBigmap(contract, bigmap, key) {
    let query = `v1/contracts/${contract}/bigmaps/${bigmap}/keys/${key}`;
    let res = await fetch(TZKT_API + query);
    if (res.status === 200) {
        let data = await res.json();
        if (data && data.active) {
            return data.value;
        }
    }
}

export async function getContractMetadata(contract) {
    let query = `v1/contracts/${contract}/bigmaps/metadata/keys/`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    let url = bytes2Char(data[data.length - 1]["value"]);

    try {
        const res = await fetch(resolveIpfs(url));
        if (res.ok) {
            data = await res.json();
        } else {
            throw Error("Fechitng metadata failed");
        }
    } catch (e) {
        console.log("error", e);
        return {};
    }
    return data;
}

export async function getTokenMetadata(contract, tokenId) {
    let raw_metadata = (
        await getContractBigmap(contract, "token_metadata", tokenId)
    ).token_info;
    let metadata = {};
    metadata.name = bytes2Char(raw_metadata.name);
    metadata.artifactUri = bytes2Char(raw_metadata.artifactUri);
    if (raw_metadata.displayUri)
        metadata.displayUri = bytes2Char(raw_metadata.displayUri);
    if (raw_metadata.thumbnailUri)
        metadata.thumbnailUri = bytes2Char(raw_metadata.thumbnailUri);
    return metadata;
}
