function PreviewMessage({ isBig, message }) {
    return (
        <div
            className="border border-grey-700  aspect-[14/13] w-full  object-cover"
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
