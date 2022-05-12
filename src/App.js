
import "bulma/css/bulma.min.css";
import "./App.css";
import Test from "./components/Test";

function App() {
    return (
        <div classname="main">
            {["hello", "world", "huhu"].map((x) => (
                <Test val={x} />
            ))}
          <div>Hello, World</div>
        </div>
    );
}

export default App;
