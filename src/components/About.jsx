import Layout from "./Layout";
function About() {
    return (
        <Layout>
            <div className="main">
                <h1>For Artists</h1>
                <p>
                    Download our p5.js template to get started.
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
                            Download p5.js starter template
                        </button>
                    </a>
                </p>

                <h1>About Re—tain</h1>
                <p>
                    You own the contract.
                    <br />
                    <br />
                    On-chain metadata.
                    <br />
                    <br />
                    Integrated marketplace.
                </p>

                <h1>Sales Fee</h1>
                <p>5% on primary, 2.5% on secondary</p>
                <p>We don't charge anything for contract deployment; you only need to pay Tezos gas fees</p>

                <h1>Disclaimer</h1>
                <b>TL;DR USE AT YOUR OWN RISK & DO YOUR OWN RESEARCH.</b>
                <p>
                Re-tain.xyz is currently in its alpha testing phase, serving as an experimental platform. While our team strives to ensure a secure environment, please be aware that Re-tain.xyz does not assume any liability or responsibility for any damages resulting from platform usage.
                </p>
            </div>
            <br /><br /><br /><br /><br /><br />
        </Layout>
    );
}

export default About;
