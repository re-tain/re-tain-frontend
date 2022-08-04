import { ENV } from "./consts";

let contractList;
if (["dev", "staging"].includes(ENV)) {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT18rHLA8S4meAWQc5T6PoJxz7jAZhfCiNRo",
            author: "pifragile",
        },
    ];
} else if (ENV === "prod") {
    contractList = [];
}

export default contractList;
