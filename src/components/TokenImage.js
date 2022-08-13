import { resolveIpfs } from "../lib/utils";
function TokenImage({ displayUrl, url }) {
    return (
        <div
        className="standard-width standard-height"
        >
            {!displayUrl && (
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

            {displayUrl && <img alt="token" src={resolveIpfs(displayUrl)} />}
        </div>
    );
}

export default TokenImage;
