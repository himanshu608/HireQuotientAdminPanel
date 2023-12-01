const PaginationList = ({ totalPages, setPageNo, pageNo }) => {
    const getPageButtons = () => {
      const buttons = [];
      const maxButtonsToShow = 3;
  
      if (totalPages <= maxButtonsToShow) {
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              className={`page-number paginationButton ${i === pageNo ? 'active' : ''}`}
              onClick={() => setPageNo(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            key={1}
            className={`page-number paginationButton ${1 === pageNo ? 'active' : ''}`}
            onClick={() => setPageNo(1)}
          >
            1
          </button>
        );
  
        const halfButtons = Math.floor(maxButtonsToShow / 2);
        const startPage = Math.max(2, pageNo - halfButtons);
        const endPage = Math.min(totalPages - 1, startPage + maxButtonsToShow - 2);
  
        if (startPage > 2) {
          buttons.push(
            <div key="start" className="page-number paginationButton">
              ..
            </div>
          );
        }
  
        for (let i = startPage; i <= endPage; i++) {
          buttons.push(
            <button
              key={i}
              className={`page-number paginationButton ${i === pageNo ? 'active' : ''}`}
              onClick={() => setPageNo(i)}
            >
              {i}
            </button>
          );
        }
  
        if (endPage < totalPages - 1) {
          buttons.push(
            <div key="end" className="page-number paginationButton">
              ..
            </div>
          );
        }
  
        buttons.push(
          <button
            key={totalPages}
            className={`page-number paginationButton ${totalPages === pageNo ? 'active' : ''}`}
            onClick={() => setPageNo(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
  
      return buttons;
    };
  
    return <>{getPageButtons()}</>;
  };

  export default PaginationList;