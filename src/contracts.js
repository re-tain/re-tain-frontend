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
            address: "KT1FmraLFfUC5tpW5EhgqeJvCQBBt2cLm5CM",
            author: "pifragile",
        },
    ];
} else if (ENV === "prod") {
    contractList = [
        {
            name: "Genesis",
            address: "KT1D7Ufx21sz9yDyP4Rs1WBCur9XhaZ9JwNE",
            author: "pifragile",
        },
    ];
}

export default contractList;
