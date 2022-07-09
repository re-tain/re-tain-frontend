import { Link } from "react-router-dom";
import TokenImage from "./TokenImage";
function TokenBox({ id, contract, title, url, displayUrl, price }) {
    return (
        <div
            style={{
                margin: "30px",
                width: "min(30vw, 300px)",
                height: "min(30vw, 300px)",
                padding: "10px",
                position: "relative",
            }}
        >
            <TokenImage url={url} displayUrl={displayUrl} />

            <div
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    marginTop: "3px",
                }}
            >
                {title}
            </div>
            {price && (
                <div
                    style={{
                        marginTop: "3px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    ꜩ {price / 1000000}
                </div>
            )}

            <Link to={`/token-detail/${contract}/${id}`}>
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        display: "inline-block",
                        height: "100%",
                        width: "100%",
                        padding: "20px",
                    }}
                ></div>
            </Link>
        </div>
    );
}

export default TokenBox;
