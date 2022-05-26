
function PaginationButtons({ previousPage, nextPage }) {
    return (
        <div style={{marginTop: '5vw'}}>
            <button className="btn btn-default" onClick={previousPage}>
                Previous
            </button>
            <button className="btn btn-default" onClick={nextPage}>
                Next
            </button>
        </div>
    );
}

export default PaginationButtons;
