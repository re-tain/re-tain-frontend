import { ENV } from "./consts";

let referenceContract;

if (["dev", "staging"].includes(ENV)) {
    referenceContract = "KT1MgbU11F1Q3GsAVPRK1JFmPLGh4AWFpzqg";
} else if (ENV === "prod") {
    referenceContract = "KT199xqPrHQxibWtqq3GmYiob2isFJjRmTGV";
}

export default referenceContract;
