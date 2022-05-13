import Layout from "./Layout";
import MintForm from "./MintForm";

function Mint() {
    return (
        <Layout>
            <h1>Mint</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <iframe
                    style={{
                        border: "None",
                        height: "400px",
                        width: "400px",
                    }}
                    src="https://pifragile.com/ab0/"
                ></iframe>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1vh",
                }}
            >
                <div style={{ width: "400px" }}>
                    <MintForm />
                </div>
            </div>
        </Layout>
    );
}

export default Mint;
