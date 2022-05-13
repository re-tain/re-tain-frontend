//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import Layout from "./components/Layout";
import Test from "./components/Test";

function App() {
    return (
        <Layout>
            <div classname="main">
                {["hello", "world", "huhu"].map((x) => (
                    <Test val={x} />
                ))}
                <div>Hello, World</div>
            </div>
        </Layout>
    );
}

export default App;
