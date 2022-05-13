//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import { Routes, Route} from 'react-router-dom';

import Home from "./components/Home";

function App() {

    return (
        //<Home/>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      );
}

export default App;
