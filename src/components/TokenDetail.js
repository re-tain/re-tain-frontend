import { useParams } from "react-router-dom";

import Layout from "./Layout";
import TokenActionForm from "./TokenActionForm";

import { useEffect, useState } from "react";

import { TZKT_API } from "../consts";

import { getToken } from "../lib/api";
import UserDetail from "./UserDetail";
import { resolveIpfs } from "../lib/utils";

function TokenDetail() {
    let { contract, tokenId } = useParams();
    const [tokenPrice, setTokenPrice] = useState(null);
    const [owner, setOwner] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            let token = await getToken(contract, tokenId);
            setToken(token);
        };

        const fetchPrice = async () => {
            let query = `v1/contracts/${contract}/bigmaps/listings/keys/${tokenId}`;
            let res = await fetch(TZKT_API + query);
            if (res.status === 200) {
                let data = await res.json();
                if (data && data.active) {
                    setTokenPrice(parseInt(data.value));
                }
            }
        };

        const fetchOwner = async () => {
            let query = `v1/contracts/${contract}/bigmaps/ledger/keys/${tokenId}`;
            let res = await fetch(TZKT_API + query);
            if (res.status === 200) {
                let data = await res.json();
                if (data && data.active) {
                    let owner = data.value;
                    setOwner(owner);
                }
            }
        };

        fetchToken().catch(console.error);
        fetchPrice().catch(console.error);
        fetchOwner().catch(console.error);
    }, [tokenId, contract]);

    if (token) {
        return (
            <Layout>
                <div>
                    <h1>{token.metadata.name}</h1>
                    <div>
                        <b>Owner:</b>
                        <UserDetail address={owner} />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    <iframe
                        title="token"
                        style={{
                            border: "None",
                            height: "400px",
                            width: "400px",
                            margin: "10px",
                        }}
                        src={resolveIpfs(token.metadata.artifactUri)}
                    ></iframe>

                    <div style={{ width: "400px", margin: "10px" }}>
                        <TokenActionForm
                            price={tokenPrice}
                            contract={contract}
                            tokenId={tokenId}
                            owner={owner}
                        />
                    </div>
                </div>
            </Layout>
        );
    } else {
        <Layout>return "Loading..";</Layout>;
    }
}

export default TokenDetail;
