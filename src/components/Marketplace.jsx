import { getToken, getTokenMetadata } from "../lib/api";
import TokenOverview from "./TokenOverview";

function MarketPlace({ contract }) {
    const query = `v1/contracts/${contract}/bigmaps/listings/keys?active=true`;
    async function extractTokensForMarketplace(data) {
        let tokens = [];
        for (let item of data) {
            let token = await getToken(contract, item.key);
            if (token) {
                token["price"] = parseInt(item.value);
                tokens.push(token);
            }
        }
        return tokens;
    }

    return (
        <TokenOverview
            query={query}
            extractTokens={extractTokensForMarketplace}
            pageLength={3}
            title={"Marketplace"}
        />
    );
}

export default MarketPlace;
