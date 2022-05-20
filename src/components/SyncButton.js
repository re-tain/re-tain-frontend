import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { Link } from 'react-router-dom';


function SyncButton() {
    const { activeAccount, connect, disconnect } = useWallet();
    return (
        <div style={{
            marginLeft: '5vw'
        }}>
        {!activeAccount && <button className="btn btn-default" onClick={connect}>Sync</button>}
        {activeAccount && <button className="btn btn-default" onClick={disconnect}>Unsync</button>}

            
        </div>
    );
}

export default SyncButton