import SyncButton from "./SyncButton";
import { Link } from "react-router-dom";
import contracts from "../contracts";

function Layout({ children, favicon = "/favicon.png" }) {
    return (
        <div
            style={{
                paddingLeft: "10vw",
                paddingRight: "10vw",
                minHeight: "100vh",
                margin: 0,
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
            }}
        >
            <header>
                <div className="terminal-nav">
                    <div className="terminal-logo">
                        <div className="logo terminal-prompt">
                            <span className="no-style">
                                <Link to="/">EditART</Link>
                            </span>
                        </div>
                    </div>
                    <nav className="terminal-menu">
                        <ul>
                            <li key="Series">
                                <span className="menu-item">
                                    <div className="show">
                                        <Link to="#">Series</Link>
                                    </div>
                                    <div className="list-categories">
                                        <ul>
                                            {contracts.map((c) => (
                                                <li key={c.name}>
                                                    <span className="menu-item">
                                                        <Link
                                                            to={`/series/${c.address}`}
                                                        >
                                                            {c.name}
                                                        </Link>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </span>
                            </li>
                            <li key="MyCollection">
                                <span className="menu-item">
                                    <Link to="/my-collection">
                                        My collection
                                    </Link>
                                </span>
                            </li>

                            <li key="About">
                                <span className="menu-item">
                                    <Link to="/about">About</Link>
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
                Built with <a href="https://tzkt.io">TzKT API</a>
            </footer>
        </div>
    );
}

export default Layout;
