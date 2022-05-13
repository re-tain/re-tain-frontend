import Layout from "./Layout";
import Test from "./Test";

function Home() {
    return (
        <Layout>
            <div className="main">
                {["hello", "world", "huhu"].map((x) => (
                    <Test val={x} key={x}/>
                ))}
                <div>Hello, World</div>
            </div>
        </Layout>
    );
}

export default Home;