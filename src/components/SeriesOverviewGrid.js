import LoadMoreButton from "./LoadMoreButton";

function SeriesOverviewGrid({ children, loadMore }) {
    console.log(children);
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {children}
            </div>
            {/* {children.length === 0 && (
                <div style={{ marginTop: "5vw" }}>No tokens found..</div>
            )} */}
            <LoadMoreButton loadMore={loadMore} />
        </div>
    );
}

export default SeriesOverviewGrid;
