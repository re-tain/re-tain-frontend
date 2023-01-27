import React from "react";
import MintButton from "./MintButton";

function MintForm({ onMint, price, showButton }) {
    return (
        <div>{showButton && <MintButton price={price} onClick={onMint} />}</div>
    );
}

export default MintForm;
