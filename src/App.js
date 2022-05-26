//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Home from "./components/Home";
import Mint from "./components/Mint";
import TokenDetail from "./components/TokenDetail";
import MyCollection from "./components/MyCollection";


import { WalletContext, beaconWallet } from "./lib/wallet";

function App() {

    const [wallet, setWallet] = useState(beaconWallet);

    return (
        <WalletContext.Provider value={wallet}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mint" element={<Mint />} />
                    <Route
                        path="/token-detail/:tokenId"
                        element={<TokenDetail />}
                    />
                    <Route path="/my-collection" element={<MyCollection />} />
                </Routes>
            </div>
        </WalletContext.Provider>
    );
}

export default App;
