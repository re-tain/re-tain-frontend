import { ENV } from "./consts";

let contractList;
if (["dev", "staging"].includes(ENV)) {
    contractList = [
        {
            name: "EATEST",
            address: "KT1Rq14t5dfUxYkQXw1NGFciBxi9Spjm74mG",
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
