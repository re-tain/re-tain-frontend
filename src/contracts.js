import { ENV } from "./consts";

let contractList;
if (["dev", "staging"].includes(ENV)) {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT1MN45jArZpp7nt63yE9drs6sXoQ6A2cMt7",
            author: "pifragile",
        },
        {
            name: "Genesis",
            address: "KT1V3BPpc98BbL6wXn7m9AZJx5i5Xp8b4LTU",
            author: "pifragile",
        },
    ];
} else if (ENV === "prod") {
    contractList = [];
}

export default contractList;
