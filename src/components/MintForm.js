function MintForm() {
    return (
        <div>
            <form action="#">
                <fieldset>
                    <legend>Sliders</legend>
                    <div class="form-group">
                        <input className="mint-slider" type="range" min="1" max="100" id="value0"/>
                        <input className="mint-slider" type="range" min="1" max="100" id="value1"/>
                        <input className="mint-slider" type="range" min="1" max="100" id="value2"/>
                        <input className="mint-slider" type="range" min="1" max="100" id="value3"/>
                        <input className="mint-slider" type="range" min="1" max="100" id="value4"/>
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-default"
                            type="submit"
                            role="button"
                            name="submit"
                            id="submit"
                        >
                            Preview
                        </button>
                        <button
                            class="btn btn-default"
                            type="submit"
                            role="button"
                            name="submit"
                            id="submit"
                        >
                            Mint
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default MintForm;
