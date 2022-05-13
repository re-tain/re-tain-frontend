import Layout from "./Layout";
import TokenBox from "./TokenBox";

function Home() {
    return (
        <Layout>
            <div className="main">
            <h1>About EditArt</h1>
                <div>
                    EditArt is a platform for generative art, where collectors can co-create a piece of art with the artist.
                </div>
                <h1>Token Overview</h1>
                <div style={
                    {
                        display: 'flex',
                        flexWrap: 'wrap'
                    }
                }>
                {["hello", "world", "huhu", "eis", "a", "s", "h", "e", "ui", "oii"].map((x) => (
                    <TokenBox title={x} key={x}/>
                ))}
                </div>
            </div>
        </Layout>
    );
}

export default Home;