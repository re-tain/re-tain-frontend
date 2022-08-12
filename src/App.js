//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Home from "./components/Home";
import Mint from "./components/Mint";
import TokenDetail from "./components/TokenDetail";
import MyCollection from "./components/MyCollection";
import MarketPlace from "./components/Marketplace";
import Series from "./components/Series";
import About from "./components/About";

import { WalletContext, beaconWallet } from "./lib/wallet";
import ArtistPanel from "./components/ArtistPanel";
import Sandbox from "./components/Sandbox";
import SeriesOverview from "./components/SeriesOverview";

function App() {
    const [wallet] = useState(beaconWallet);

    return (
        <WalletContext.Provider value={wallet}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mint/:contract" element={<Mint />} />
                    <Route
                        path="/token-detail/:contract/:tokenId"
                        element={<TokenDetail />}
                    />
                    <Route path="/my-collection" element={<MyCollection />} />
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/series/:contract" element={<Series />} />
                    <Route
                        path="/artist-panel/:contract"
                        element={<ArtistPanel />}
                    />
                    <Route path="/sandbox/" element={<Sandbox />} />
                    <Route path="/series-overview/" element={<SeriesOverview />} />
                </Routes>
            </div>
        </WalletContext.Provider>
    );
}

export default App;
