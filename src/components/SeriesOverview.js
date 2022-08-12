import Layout from "./Layout";
import SeriesBox from "./SeriesBox";
import contracts from "../contracts";

function SeriesOverview() {
    return (
        <Layout>
            <div>
                {contracts.map((c) => (
                    <SeriesBox contract={c.address} author={c.author}/>
                ))}
            </div>
        </Layout>
    );
}

export default SeriesOverview;
