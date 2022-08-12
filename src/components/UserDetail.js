import { useEffect, useState } from "react";
import { TZPROFILES_API } from "../consts";
import { Link } from "react-router-dom";

function UserDetail({ address, isLink }) {
    const [tzProfile, setTzProfile] = useState(null);
    useEffect(() => {
        const fetchTzProfile = async (address) => {
            if (!address) return;
            let res = await fetch(TZPROFILES_API + address);
            if (res.status === 200) {
                let data = await res.json();
                if (data.length === 0) return;
                let userData = JSON.parse(data[1][1])["credentialSubject"];
                userData["twitter"] = JSON.parse(data[0][1])[
                    "credentialSubject"
                ]["sameAs"];
                setTzProfile(userData);
            }
        };
        fetchTzProfile(address).catch(console.error);
    }, [address]);

    function getAddrString(address) {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    if (isLink) {
        return (
            <Link to={`/user/${address}`}>
                {tzProfile && <span>{tzProfile.alias}</span>}
                {!tzProfile && <span>{getAddrString(address)}</span>}
            </Link>
        );
    } else {
        return (
            <div style={{ width: "min(400px, 80vw)" }}>
                {tzProfile && (
                    <div style={{ marginBottom: "2vw" }}>
                        <img
                            src={tzProfile.logo}
                            style={{ width: "50px" }}
                            alt="Logo"
                        ></img>
                        <div>
                            <b>{tzProfile.alias}</b>
                        </div>
                        <div>{tzProfile.description}</div>

                        <div>
                            <a href={tzProfile.twitter}>
                                {"@" + tzProfile.twitter.split("com/")[1]}
                            </a>
                        </div>

                        <div>
                            <a href={tzProfile.website}>{tzProfile.website}</a>
                        </div>
                    </div>
                )}
                {!tzProfile && (
                    <div>
                        <b>{address}</b>
                    </div>
                )}
            </div>
        );
    }
}

export default UserDetail;
