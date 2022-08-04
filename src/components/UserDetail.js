import { useEffect, useState } from "react";
import { TZPROFILES_API } from "../consts";

function UserDetail({ address }) {
    const [tzProfile, setTzProfile] = useState(null);

    useEffect(() => {
        const fetchTzProfile = async (address) => {
            if (!address) return;
            let res = await fetch(TZPROFILES_API + address);
            if (res.status === 200) {
                let data = await res.json();
                if(data.length === 0) return;
                let userData = JSON.parse(data[1][1])["credentialSubject"];
                userData["twitter"] = JSON.parse(data[0][1])[
                    "credentialSubject"
                ]["sameAs"];
                setTzProfile(userData);
            }
        };
        fetchTzProfile(address).catch(
            console.error
        );
    }, [address]);

    return (
        <div style= {{width: '30vw', padding: '1vh 3vw 0 0'}}>
            {tzProfile && (
                <div style={{marginBottom: '2vw'}}>
                    <img src={tzProfile.logo} style={{width: '50px'}} alt="Logo"></img>
                    <div>{tzProfile.alias}</div>
                    <div>{tzProfile.description}</div>

                    <div>
                        <a href={tzProfile.twitter}>
                            {'@' + tzProfile.twitter.split("com/")[1]}
                        </a>
                    </div>

                    <div>
                        <a href={tzProfile.website}>{tzProfile.website}</a>
                    </div>
                </div>
            )}
            {!tzProfile && <div>{address}</div>}
        </div>
    );
}

export default UserDetail;
