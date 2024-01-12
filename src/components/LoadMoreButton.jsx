
function LoadMoreButton({ loadMore }) {
    return (
        <div>
            <button className="btn btn-default btn-ghost" onClick={loadMore}>
                Load more
            </button>
        </div>
    );
}

export default LoadMoreButton;
