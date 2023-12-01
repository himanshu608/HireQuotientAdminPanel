import './panelFooter.css';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import PaginationList from './PaginationList';

const PanelFooter = ({totalUsers, setPageNo, pageNo,selectedUsers}) => {
    const totalPages = Math.ceil(totalUsers/10);

  return (
    <div className="panelFooterWrapper">
        <div className="selectedPages">
            {selectedUsers?.length} of {totalUsers} row(s) selected.
        </div>
        <div className="pagination">
            <div className="pageNumber">
                Page {pageNo} of {totalPages}
            </div>
            <div className="pageLists">
                <button className="previous-page paginationButton" 
                    onClick={()=>setPageNo(prev=> prev===1?prev:prev-1)}
                >
                    <FaAngleLeft/>
                </button>
                <PaginationList pageNo={pageNo} totalPages={totalPages} setPageNo={setPageNo}/>
                <button className="next-page paginationButton"
                    onClick={()=>
                        setPageNo(prev=> 
                            totalPages === prev?prev :prev+1)}
                >
                    <FaAngleRight/>
                </button>
            </div>
        </div>
    </div>
  )
}

  
export default PanelFooter