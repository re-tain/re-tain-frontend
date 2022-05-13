import Layout from "./Layout";
import TokenBox from "./TokenBox";

function Home() {
    return (
        <Layout>
            <div className="main">
                {["hello", "world", "huhu", "eis", "a", "s", "h", "e", "ui", "oii"].map((x) => (
                    <TokenBox title={x} key={x}/>
                ))}
            </div>
        </Layout>
    );
}

export default Home;