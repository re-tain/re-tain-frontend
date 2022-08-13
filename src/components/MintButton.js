import { formatMutez } from "../lib/utils";

function MintButton({price, onClick}) {
    return (
        <button
        className="btn btn-default"
        name="mint"
        id="mint"
        onClick={onClick}
    >
        Mint for {formatMutez(price)}
    </button>
    );
}

export default MintButton;
