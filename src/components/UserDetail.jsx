import { useEffect, useState } from "react";
import { OBJKT_API } from "../consts";
import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

function UserDetail({ address, isLink }) {
    const [tzProfile, setTzProfile] = useState(null);
    useEffect(() => {
        const fetchTzProfile = async (address) => {
            if (!address) return;
            let query = `query MyQuery {
                holder(where: {address: {_eq: "${address}"}}) {
                  alias
                  logo
                  twitter
                  website
                  description
                }
              }`;

            let res = await fetch(OBJKT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query,
                }),
            });

            if (res.status === 200) {
                let data = await res.json();
                let holder = data.data.holder;
                if (holder.length > 0 && holder[0].alias != null) {
                    setTzProfile(holder[0]);
                }
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
            <div>
                {tzProfile && (
                    <ul role="list" className="grid grid-cols-1 gap-6">
                        <div className="mt-6 flex w-full items-center justify-between space-x-6 ">
                            <img
                                className="h-10 w-10 flex-shrink-0 rounded-full bg-grey-300"
                                src={tzProfile.logo}
                                alt=""
                            />
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-grey-400">
                                        {tzProfile.alias}
                                    </h3>
                                    <span className="inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ">
                                        <CheckBadgeIcon className="w-6 h-6"></CheckBadgeIcon>
                                    </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-grey-500">
                                    {tzProfile.twitter && (
                                        <span>
                                            <a href={tzProfile.twitter}>
                                                {"@" +
                                                    tzProfile.twitter.split(
                                                        "com/"
                                                    )[1]}
                                            </a>{" "}
                                            •{" "}
                                        </span>
                                    )}

                                    <span>
                                        <a href={tzProfile.website}>
                                            {tzProfile.website}
                                        </a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </ul>
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
