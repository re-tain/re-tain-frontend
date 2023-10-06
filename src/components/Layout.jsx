import SyncButton from "./SyncButton";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../lib/wallet";

function Layout({ children, favicon = "/favicon.png" }) {
    const client = useContext(WalletContext).client;
    const [activeAccount, setActiveAccount] = useState(null);
    useEffect(() => {
        const func = async () => {
            const account = await client.getActiveAccount();
            if (account) {
                setActiveAccount(account.address);
            }
        };
        func();
    }, [client]);

    return (
        <div
            style={{
                paddingLeft: "10vw",
                paddingRight: "10vw",
                minHeight: "100vh",
                margin: 0,
                paddingTop: 15,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
            }}
        >
            <header>
                <div className="terminal-nav">
                    <Link to="/">
                        <img src="/logo.svg"></img>
                    </Link>

                    <nav className="terminal-menu">
                        <ul>
                            <li key="Series">
                                <span className="menu-item">
                                    <Link to="/series-overview">Explore</Link>
                                </span>
                            </li>
                            <li key="MyCollection">
                                <span className="menu-item">
                                    <Link to={`/user/${activeAccount}`}>
                                        Your Collection
                                    </Link>
                                </span>
                            </li>
                            <li key="About">
                                <span className="menu-item">
                                    <Link to="/about">About</Link>
                                </span>
                            </li>
                            <li key="Deploy">
                                <span className="menu-item">
                                    <Link to="/deploy">Mint</Link>
                                </span>
                            </li>
                        </ul>
                    </nav>
                    <SyncButton />
                </div>
            </header>
            <div
                className="content"
                style={{
                    marginTop: "5vh",
                }}
            >
                {children}
            </div>
            <footer>
                <br />
                <br />
                <br />
                <br />
                Built with{" "}
                <a href="https://tzkt.io" target="_blank" rel="noreferrer">
                    TzKT API
                </a>
            </footer>
        </div>
    );
}

export default Layout;
