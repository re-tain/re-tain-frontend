import { resolveIpfs } from "../lib/utils";
import LiveViewIFrame from "./LiveViewIFrame";
import PreviewMessage from "./PreviewMessage";

const errors = {
    0: "Preview failed: timeout",
    1: "Preview failed: no triggerPreview() call",
    2: "Preview failed: unknown error",
    1000: "Waiting for first token...",
};

function TokenImage({ displayUrl }) {
    let error;
    if (displayUrl && !displayUrl.startsWith("ipfs"))
        error = errors[parseInt(displayUrl)];

    if (error) {
        return <PreviewMessage message={error} />;
    }

    if (!displayUrl) {
        return <PreviewMessage message="Preview not available yet." />;
    }

    return (
        <img
            className="h-full w-full"
            alt="token"
            src={resolveIpfs(displayUrl)}
        />
    );
}

export default TokenImage;
