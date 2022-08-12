import { ENV } from "./consts";

let contractList;
if (["dev", "staging"].includes(ENV)) {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT1MN45jArZpp7nt63yE9drs6sXoQ6A2cMt7",
            author: "pifragile",
        },
    ];
} else if (ENV === "prod") {
    contractList = [];
}

export default contractList;
