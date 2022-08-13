import { IPFS_GATEWAY } from "../consts";
export function resolveIpfs(address) {
    if (address) {
        return address.replace("ipfs://", IPFS_GATEWAY);
    }
}

export function formatMutez(mutez) {
    return `ꜩ ${mutez / 1000000}`
}
