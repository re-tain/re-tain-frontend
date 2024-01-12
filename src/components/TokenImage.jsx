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
        return (
            <PreviewMessage
                message="Preview not available yet."
            />
        );
    }

    return (
        <img
            className="border border-grey-700  aspect-[14/13] w-full  object-cover"
            alt="token"
            src={resolveIpfs(displayUrl)}
        />

        // <div
        //     className="border border-grey-700  aspect-[14/13] w-full  object-cover"
        //     style={{ position: "relative" }}
        // >
        //     {displayArtifact && <LiveViewIFrame url={url} />}

        //     {displayArtifact && (
        //         <div
        //             style={{
        //                 position: "absolute",
        //                 top: 0,
        //                 left: 0,
        //                 zIndex: "-100",
        //                 paddingTop: "50%",
        //             }}
        //         >
        //             Loading live view...
        //         </div>
        //     )}

        //     {!displayArtifact && (
        //         <img
        //             className="border border-grey-700  aspect-[14/13] w-full  object-cover"
        //             alt="token"
        //             src={resolveIpfs(displayUrl)}
        //         />
        //     )}
        // </div>
    );
}

export default TokenImage;
