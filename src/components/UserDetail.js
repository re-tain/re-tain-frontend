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
                let userData = JSON.parse(data[1][1])["credentialSubject"];
                userData["twitter"] = JSON.parse(data[0][1])[
                    "credentialSubject"
                ]["sameAs"];
                setTzProfile(userData);
            }
        };
        fetchTzProfile("tz1gJde57Meuqb2xMYbapTPzgTZkiCmPAMZA").catch(
            console.error
        );
    }, [address]);

    return (
        <div>
            {tzProfile && (
                <div>
                    <img src={tzProfile.logo} style={{width: '50px'}}></img>
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
