function MintButton({price, onClick}) {
    return (
        <button
        className="btn btn-default"
        name="mint"
        id="mint"
        onClick={onClick}
    >
        Mint for ꜩ {price / 1000000}
    </button>
    );
}

export default MintButton;
