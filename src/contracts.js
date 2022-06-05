import { ENV } from "./consts";

let contractList;
if (ENV === "dev") {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT1TzkQSbrS8qeJ1iTbXZufizpXq57QELhgp",
            author: "pifragile",
        },
        {
            name: "EATEST ZWEI",
            address: "KT1UHpfAcxmCNE5SusasBpBJKwmdU37EVjyP",
            author: "Some Person",
        },
    ];
} else if (ENV === "prod") {
    contractList = [
        {
            name: "EATEST EIS",
            address: "KT1TzkQSbrS8qeJ1iTbXZufizpXq57QELhgp",
            author: "pifragile",
        },
        {
            name: "EATEST ZWEI",
            address: "KT1UHpfAcxmCNE5SusasBpBJKwmdU37EVjyP",
            author: "Some Person",
        },
    ];
}

export default contractList;
