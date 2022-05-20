import Layout from "./Layout";
import TokenOverview from "./TokenOverview";

function Home() {
    return (
        <Layout>
            <div className="main">
                <h1>EditArt...</h1>

                <ul>
                    <li>
                        is a generative art platform, where collectors can
                        co-create a piece of art with the artist.
                    </li>
                    <li>
                        is currently running in Beta mode and artists wishing to
                        release a token can do so, but by invite only.
                    </li>
                    <li>
                        is a project by generative artist{" "}
                        <a href="https://twitter.com/pifragile/"> pifragile</a>
                    </li>
                </ul>
                <div>
                    For infos{" "}
                    <a href="https://twitter.com/pifragile/">
                        {" "}
                        DM me on twitter
                    </a>
                </div>

                <div>❤️ , pifragile</div>
                <TokenOverview></TokenOverview>
            </div>
        </Layout>
    );
}

export default Home;
