import Layout from "./Layout";
function About() {
    return (
        <Layout>
            <div className="main">
                <h1>For artists</h1>
                <p>
                    You can can deploy your contract using the deploy form. For
                    the artwork, please use the provided template. It provides a
                    random function called rand(), based on the randomness that
                    will be generated on-chain by the contract. The rest is up
                    to you. For testing, please deploy the contract to the
                    testnet, after that the project will be available at{" "}
                    <a
                        href="https://staging.re-tain.xyz"
                        target="_blank"
                        rel="noreferrer"
                    >
                        staging.re-tain.xyz
                    </a>
                    {". "}
                    After deployment of the contract, the project will be
                    paused, which means that only the artist can mint. You can
                    unpause using the artist panel, available on the series page
                    (if you are connected with the artist account.) Have fun! If
                    you have any questions, reach out on twitter
                    <a
                        href="https://twitter.com/pifragile/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        @pifragile
                    </a>
                    .
                    <br />
                    <br />
                    <a
                        href="https://github.com/pifragile/re-tain-template"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button
                            className="btn btn-default"
                            name="template"
                            id="template"
                        >
                            Download template
                        </button>
                    </a>
                </p>

                <h1>About Retain.xyz</h1>
                <p>
                    You own the contract.
                    <br />
                    <br />
                    Onchain metadata.
                    <br />
                    <br />
                    Onchain randomness.
                    <br />
                    <br />
                    Integrated marketplace.
                </p>

                <h1>Fees</h1>
                <p>2.5% on mints and royalties</p>

                <h1>Disclaimer</h1>
                <b>TL;DR USE AT YOUR OWN RISK.</b>
                <p>
                    re-tain.xyz is an experimental platform. While every effort
                    is made by the team to provide a secure platform, Editart
                    will not accept any liability or responsibility for any kind
                    of damage created by the use of the platform.
                </p>
            </div>
        </Layout>
    );
}

export default About;
