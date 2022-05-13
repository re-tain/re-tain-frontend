//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import { Routes, Route} from 'react-router-dom';

import Home from "./components/Home";
import Mint from "./components/Mint";

function App() {

    return (
        //<Home/>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
          </Routes>
        </div>
      );
}

export default App;
