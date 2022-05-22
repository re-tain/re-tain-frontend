import { useParams } from "react-router-dom";

import Layout from "./Layout";
import TokenActionForm from "./TokenActionForm";

function TokenDetail() {
    let { tokenId } = useParams();
    return (
        <Layout>
            <div>
                <h1>{tokenId} (tz1gJde57Meuqb2xMYbapTPzgTZkiCmPAMZA)</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <iframe
                    title="token"
                    style={{
                        border: "None",
                        height: "400px",
                        width: "400px",
                        margin: "10px",
                    }}
                    src="https://pifragile.com/ab0/"
                ></iframe>

                <div style={{ width: "400px", margin: "10px" }}>
                    <TokenActionForm />
                </div>
            </div>
        </Layout>
    );
}

export default TokenDetail;
