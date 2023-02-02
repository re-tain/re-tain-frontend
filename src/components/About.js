import Layout from "./Layout";
function About() {
    return (
        <Layout>
            <div className="main">
                <h1>For artists</h1>
                <p>
                    EditART is open to submissions form all generative artists.
                    If you would like to create e project on EditART you can
                    find a template with all the instructions{" "}
                    <a
                        href="https://github.com/pifragile/editartTemplate"
                        target="_blank" rel="noreferrer"
                    >
                        {" "}
                        here
                    </a>
                    . If you have any questions, reach out on twitter
                    <a href="https://twitter.com/pifragile/" target="_blank" rel="noreferrer">
                        {" "}
                        @pifragile
                    </a>
                    .
                    <br />
                    <br />
                    <a
                        href="https://github.com/pifragile/editartTemplate"
                        target="_blank" rel="noreferrer"
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
                </p>
                <h1>On chain metadata and onchain randomness.</h1>
                <p>

                </p>

                <h1>Fees</h1>
                <p>
                    Platform fees: 2.5%

                </p>

                <h1>Disclaimer</h1>
                <b>TL;DR USE AT YOUR OWN RISK.</b>
                <p>
                    Retain.xyz is an experimental platform. While every effort is
                    made by the team to provide a secure platform, Editart will
                    not accept any liability or responsibility for any kind of
                    damage created by the use of the platform.
                </p>
            </div>
        </Layout>
    );
}

export default About;
