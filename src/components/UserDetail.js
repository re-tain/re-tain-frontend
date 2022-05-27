function UserDetail({ address, tzProfile }) {
    return (
        <div>
            {tzProfile && (
                <div>
                    <div>{tzProfile.alias}</div>
                    <div>{tzProfile.description}</div>

                    <div>
                        <a href={tzProfile.twitter}>
                            {tzProfile.twitter.split("com/")[1]}
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
