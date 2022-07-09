import { resolveIpfs } from "../lib/utils";
function TokenImage({ displayUrl, url }) {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
            }}
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
