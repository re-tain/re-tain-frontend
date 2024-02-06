import { IPFS_GATEWAY } from "../consts";
import { getTokenMetadata } from "./api";

export function resolveIpfs(address) {
    if(address.includes('http')) return address
    if (address) {
        return address.replace("ipfs://", IPFS_GATEWAY);
    }
}

export function resolveIpfsSketch(address) {
    return insertIndexHtml(resolveIpfs(address))
}

export function formatMutez(mutez) {
    return `ꜩ ${mutez / 1000000}`;
}

export async function extractTokensForOverview(data) {
    if ("token" in data[0]) data = data.map((item) => item.token);
    // use this when metadata is broken in api
    for (let token of data) {
        if (!("metadata" in token)) {
            token.metadata = await getTokenMetadata(
                token.contract.address,
                token.tokenId
            );
        }
    }
    return data;
}

export function getRandomHash() {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export function insertIndexHtml(url) {
    if (url.includes("index.html")) return url;

    const idx = url.indexOf("?");
    let outval;
    if (idx > -1) outval = url.substr(0, idx) + "/index.html" + url.substr(idx);
    else outval = url + "/index.html";

    return outval;
}

export function formatDate(d) {
    return new Date(d).toLocaleString()
}

export function getAddrString(address) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}