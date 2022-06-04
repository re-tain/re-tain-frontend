import { TZKT_API } from "../consts";
import { bytes2Char } from "@taquito/utils";
import { resolveIpfs } from "./utils";

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


export async function getContractStorage(contract, key) {
    let query = `v1/contracts/${contract}/storage?path=${key}`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    return data
}

export async function getContractMetadata(contract) {
    let query = `v1/contracts/${contract}/bigmaps/metadata/keys/`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json()
    let url = bytes2Char(data[data.length - 1]['value']);
    data = await fetch(resolveIpfs(url));
    return await data.json()
}