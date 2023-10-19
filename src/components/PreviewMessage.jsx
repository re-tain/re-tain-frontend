function PreviewMessage({ isBig, message }) {
    return (
        <div
            className={
                isBig
                    ? "token-detail-width token-detail-height"
                    : "standard-width standard-height"
            }
            style={{ position: "relative", border: "solid 1px white" }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: "-100",
                    paddingTop: "50%",
                }}
            >
                {message}
            </div>
        </div>
    );
}

export default PreviewMessage;
