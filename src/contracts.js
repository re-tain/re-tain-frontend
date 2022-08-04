import { ENV } from "./consts";

let contractList;
if (["dev", "staging"].includes(ENV)) {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT1P7BCwZ6EWiNyF9bTGHdCgw7uSwbJGPxb6",
            author: "pifragile",
        },
    ];
} else if (ENV === "prod") {
    contractList = [];
}

export default contractList;
