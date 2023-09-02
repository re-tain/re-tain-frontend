import React from "react";

function MintForm({ onMint, onSurpriseMint, price, showButton }) {
    return (
        <div>
            {showButton && (
                <div>
                    <button style={{width: '100%'}}
                        className="btn btn-default"
                        name="mint"
                        id="mint"
                        onClick={onMint}
                    >
                        Mint selected
                    </button>
                    <button style={{width: '100%'}}
                        className="btn btn-default"
                        name="mintSurprise"
                        id="mintSurprise"
                        onClick={onSurpriseMint}
                    >
                        Surprise me!
                    </button>
                </div>
            )}
        </div>
    );
}

export default MintForm;
