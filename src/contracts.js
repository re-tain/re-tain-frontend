import { ENV } from "./consts";

let referenceContract;

if (["dev", "staging"].includes(ENV)) {
    referenceContract = "KT1B1fDbP1FkZuHVpSpjhyFKWxBV4yziyQYQ";
} else if (ENV === "prod") {
    referenceContract = "KT199xqPrHQxibWtqq3GmYiob2isFJjRmTGV";
}

export default referenceContract;
