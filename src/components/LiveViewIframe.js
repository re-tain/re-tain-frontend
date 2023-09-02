import { resolveIpfsSketch } from "../lib/utils";

function LiveViewIFrame({ url }) {
    return (
        <iframe
            title="token"
            id="tokenFrame"
            style={{
                border: "None",
                height: "100%",
                width: "100%",
            }}
            src={resolveIpfsSketch(url)}
        />
    );
}

export default LiveViewIFrame;
