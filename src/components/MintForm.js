import React from "react";
import MintButton from "./MintButton";

function MintForm({ onSubmitForm, onMint, price }) {
    let handleChange = (e) => {
        //e.preventDefault();
        onSubmitForm(
            e.target.form.value0.value,
            e.target.form.value1.value,
            e.target.form.value2.value,
            e.target.form.value3.value,
            e.target.form.value4.value
        );
    };

    let handleMint = (e) => {
        e.preventDefault();
        onMint();
    };
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Sliders</legend>
                    <div className="form-group">
                        <input
                            className="mint-slider"
                            type="range"
                            min="0"
                            max="1"
                            defaultValue="0.5"
                            step="0.001"
                            id="value0"
                            name="value0"
                            onMouseUp={handleChange}
                            onTouchEnd={handleChange}
                        />
                        <input
                            className="mint-slider"
                            type="range"
                            min="0"
                            max="1"
                            defaultValue="0.5"
                            step="0.001"
                            id="value1"
                            name="value1"
                            onMouseUp={handleChange}
                            onTouchEnd={handleChange}
                        />
                        <input
                            className="mint-slider"
                            type="range"
                            min="0"
                            max="1"
                            defaultValue="0.5"
                            step="0.001"
                            id="value2"
                            name="value2"
                            onMouseUp={handleChange}
                            onTouchEnd={handleChange}
                        />
                        <input
                            className="mint-slider"
                            type="range"
                            min="0"
                            max="1"
                            defaultValue="0.5"
                            step="0.001"
                            id="value3"
                            name="value3"
                            onMouseUp={handleChange}
                            onTouchEnd={handleChange}
                        />
                        <input
                            className="mint-slider"
                            type="range"
                            min="0"
                            max="1"
                            defaultValue="0.5"
                            step="0.001"
                            id="value4"
                            name="value4"
                            onMouseUp={handleChange}
                            onTouchEnd={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <MintButton
                            price={price}
                            onClick={handleMint}
                        />
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default MintForm;
