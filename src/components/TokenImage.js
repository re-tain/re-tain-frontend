import { resolveIpfs } from "../lib/utils";
function TokenImage({ displayUrl, url, isBig, isLive }) {
    const showPreview = displayUrl && !isLive
    return (
        <div
            className={
                isBig
                    ? "token-detail-width token-detail-height"
                    : "standard-width standard-height"
            }
            style={{ position: "relative" }}
        >
            {!showPreview && (
                <iframe
                    title="token"
                    style={{
                        border: "None",
                        height: "100%",
                        width: "100%",
                    }}
                    src={resolveIpfs(url)}
                />
            )}

            {!showPreview && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: "-100",
                        paddingTop: "50%",
                    }}
                >
                    Loading live view...
                </div>
            )}

            {showPreview && <img alt="token" src={resolveIpfs(displayUrl)} />}
        </div>
    );
}

export default TokenImage;
