import SyncButton from './SyncButton'

function Layout({ children, favicon = "/favicon.png" }) {
    return (
        <div style={{
            'padding-right': '10vw',
            'padding-left': '10vw'
            }}>
            <header>
                <div class="terminal-nav">
                    <div class="terminal-logo">
                        <div class="logo terminal-prompt">
                            <a href="#" class="no-style">
                                EditArt
                            </a>
                        </div>
                    </div>
                    <nav class="terminal-menu">
                        <ul>
                            <li>
                                <a class="menu-item" href="#">
                                    Mint
                                </a>
                            </li>
                            <li>
                                <a class="menu-item" href="#">
                                    Marketplace
                                </a>
                            </li>
                            <li>
                                <a class="menu-item" href="#">
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
