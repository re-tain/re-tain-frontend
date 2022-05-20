import { Link } from "react-router-dom";
function TokenBox({ title, url }) {
    return (
        <div
            style={{
                margin: "30px",
                width: "min(20vw, 300px)",
                height: "min(20vw, 300px)",
                padding: "10px",
                position: "relative",
            }}
        >
            <iframe
                style={{
                    border: "None",
                    height: "100%",
                    width: "100%",
                }}
                src={url}
            />
            <div
                style={{
                    marginTop: "3px",
                }}
            >
                {title}
            </div>
            <Link to={`/token-detail/${title}`}>
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
