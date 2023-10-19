import { resolveIpfs } from "../lib/utils";
import LiveViewIFrame from "./LiveViewIFrame";
import PreviewMessage from "./PreviewMessage";

const errors = {
    0: "Preview failed: timeout",
    1: "Preview failed: no triggerPreview() call",
    2: "Preview failed: unknown error",
};

function TokenImage({ displayUrl, url, isBig, showArtifact, strictlyDisplay }) {
    let error;
    console.log(typeof displayUrl)
    if (displayUrl && !displayUrl.startsWith("ipfs")) error = errors[parseInt(displayUrl)];

    const displayArtifact = showArtifact || !displayUrl;

    if (error) {
        return <PreviewMessage isBig={isBig} message={error} />;
    }

    if (strictlyDisplay && !displayUrl) {
        return (
            <PreviewMessage
                isBig={isBig}
                message="Preview not available yet."
            />
        );
    }

    return (
        <div
            className={
                isBig
                    ? "token-detail-width token-detail-height"
                    : "standard-width standard-height"
            }
            style={{ position: "relative" }}
        >
            {displayArtifact && <LiveViewIFrame url={url} />}

            {displayArtifact && (
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

            {!displayArtifact && (
                <img alt="token" src={resolveIpfs(displayUrl)} />
            )}
        </div>
    );
}

export default TokenImage;
