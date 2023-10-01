//import "bulma/css/bulma.min.css";
import "terminal.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Home from "./components/Home";
import TokenDetail from "./components/TokenDetail";
import User from "./components/User";
import MarketPlace from "./components/Marketplace";
import Series from "./components/Series";
import About from "./components/About";

import { WalletContext, beaconWallet } from "./lib/wallet";
import ArtistPanel from "./components/ArtistPanel";
import SeriesOverview from "./components/SeriesOverview";
import DeployForm from "./components/DeployForm";
import MintIFrame from "./components/MintIFrame";

function App() {
    const [wallet] = useState(beaconWallet);

    return (
        <WalletContext.Provider value={wallet}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/deploy" element={<DeployForm />} />
                    <Route
                        path="/token-detail/:contract/:tokenId"
                        element={<TokenDetail />}
                    />
                    <Route path="/user/:address" element={<User />} />
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/series/:contract" element={<Series />} />
                    <Route
                        path="/artist-panel/:contract"
                        element={<ArtistPanel />}
                    />
                    <Route path="/series-overview/" element={<SeriesOverview />} />
                    <Route path="/mint-iframe/:contract" element={<MintIFrame />} />
                </Routes>
            </div>
        </WalletContext.Provider>
    );
}

export default App;
