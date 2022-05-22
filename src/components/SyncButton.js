
import {getActiveAccount, connectWallet, disconnectWallet} from '../lib/wallet'
import { useState, useEffect } from "react";


function SyncButton() {
    const [wallet, setWallet] = useState(null);
    useEffect(() => {
        const func = async () => {
          const account = await getActiveAccount();
          if (account) {
            setWallet(account.address);
          }
        };
        func();
      }, []);

      let connect = async () => {
        const { wallet } = await connectWallet();
        setWallet(wallet);
      }

      let disconnect = async () => {
        const { wallet } = await disconnectWallet();
        setWallet(wallet);
    }

    return (
        <div style={{
            marginLeft: '5vw'
        }}>
        {!wallet && <button className="btn btn-default" onClick={connect}>Sync</button>}
        {wallet && <button className="btn btn-default" onClick={disconnect}>Unsync</button>}

            
        </div>
    );
}

export default SyncButton