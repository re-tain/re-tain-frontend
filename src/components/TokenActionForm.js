function TokenActionForm() {
    return (
        <div>
            <form action="#">
                <form action="#">
                    <fieldset>
                        <legend>Buy</legend>
                        <div className="form-group">
                            <button
                                className="btn btn-default"
                                type="submit"
                                name="submit"
                                id="submit"
                            >
                                Buy for 5 tez
                            </button>
                        </div>
                    </fieldset>
                </form>

                <fieldset>
                    <legend>List</legend>
                    <div className="form-group">
                        <input
                            id="text"
                            name="text"
                            type="number"
                            required="true"
                            placeholder="tez"
                            step="0.0001"
                        />
                        <button
                            className="btn btn-default"
                            type="submit"
                            name="submit"
                            id="submit"
                        >
                            List
                        </button>
                    </div>
                </fieldset>
            </form>

            <form action="#">
                <fieldset>
                    <legend>Cancel Listing</legend>
                    <div className="form-group">
                        <button
                            className="btn btn-default"
                            type="submit"
                            name="submit"
                            id="submit"
                        >
                            Cancel Listing
                        </button>
                    </div>
                </fieldset>
            </form>

            <form action="#">
                <fieldset>
                    <legend>Transfer</legend>
                    <div className="form-group">
                        <input
                            id="text"
                            name="text"
                            type="text"
                            required="true"
                            placeholder="address"
                        />
                        <button
                            className="btn btn-default"
                            type="submit"
                            name="submit"
                            id="submit"
                        >
                            Transfer
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default TokenActionForm;
