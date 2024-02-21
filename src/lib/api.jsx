import { ADMIN_ADDRESS, TREASURY_ADDRESS, TZKT_API } from "../consts";
import { bytes2Char } from "@taquito/utils";
import { resolveIpfs } from "./utils";
import referenceContract from "../contracts";

const sum = (arr) => arr.reduce((partialSum, a) => partialSum + parseInt(a), 0);

function validateRoyalties(royalties) {
    return (
        royalties[TREASURY_ADDRESS] === "25" &&
        sum(Object.values(royalties)) < 1000
    );
}

function validateDistribution(distribution) {
    return sum(Object.values(distribution)) === 1000;
}

function validateContracts(contracts) {
    let validated = [];
    for (let contract of contracts) {
        if (contract.storage.platform_fee !== "50") continue;
        if (contract.storage.administrator !== ADMIN_ADDRESS) continue;
        if (contract.storage.treasury !== TREASURY_ADDRESS) continue;
        if (!validateRoyalties(contract.storage.royalties)) continue;
        if (!validateDistribution(contract.storage.distribution)) continue;
        validated.push(contract);
    }
    return validated;
}
export async function getAllContracts() {
    let query = `v1/contracts/${referenceContract}/same?sort.desc=firstActivity&firstActivity.gte=23322687&includeStorage=true&limit=10000`;
    let res = await fetch(TZKT_API + query);
    let data = await res.json();
    return validateContracts(data);
}

export async function getTokenBalances(address, contracts) {
    let promises = [];
    // API can handle urls as long as with 100 contract addresses in it
    for (let i = 0; i < contracts.length; i += 100) {
        promises.push(
            fetch(
                TZKT_API +
                    "v1/tokens/balances" +
                    "?" +
                    new URLSearchParams({
                        "token.contract.in": contracts
                            .slice(i, i + 100)
                            .map((c) => c.address)
                            .join(","),
                        account: address,
                        "balance.gt": 0,
                        "sort.desc": "firstTime",
                    })
            )
        );
    }
    let result = await Promise.all(promises);
    result = await Promise.all(result.map((r) => r.json()));
    result = result.flat();
    result.sort((a, b) => a.firstTime - b.firstTime);
    console.log(result)
    return result;
}

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
        let token = data[0];
        if (!("metadata" in token)) {
            token.metadata = await getTokenMetadata(
                token.contract.address,
                token.tokenId
            );
        }
        return token;
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
    metadata.creators = bytes2Char(raw_metadata.creators);
    metadata.artifactUri = bytes2Char(raw_metadata.artifactUri);
    if (raw_metadata.displayUri)
        metadata.displayUri = bytes2Char(raw_metadata.displayUri);
    if (raw_metadata.thumbnailUri)
        metadata.thumbnailUri = bytes2Char(raw_metadata.thumbnailUri);
    return metadata;
}
