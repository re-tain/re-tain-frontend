import { TZKT_API } from "../consts";

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
