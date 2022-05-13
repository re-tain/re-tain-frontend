import SyncButton from './SyncButton'

function Layout({ children, favicon = "/favicon.png" }) {
    return (
        <div style={{
            paddingLeft: '10vw',
            paddingRight: '10vw'
            }}>
            <header>
                <div className="terminal-nav">
                    <div className="terminal-logo">
                        <div className="logo terminal-prompt">
                            <a href="#" className="no-style">
                                EditArt
                            </a>
                        </div>
                    </div>
                    <nav className="terminal-menu">
                        <ul>
                            <li key="Mint">
                                <a className="menu-item" href="#">
                                    Mint
                                </a>
                            </li>
                            <li key="Marketplace">
                                <a className="menu-item" href="#">
                                    Marketplace
                                </a>
                            </li>
                            <li key="MyCollection">
                                <a className="menu-item" href="#">
                                    My collection
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <SyncButton/>
                </div>
            </header>
            <div className="content">{children}</div>
        </div>
    );
}


export default Layout;
