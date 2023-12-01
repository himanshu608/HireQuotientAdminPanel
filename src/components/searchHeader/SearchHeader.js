import './searchHeader.css';
import { MdDeleteOutline } from "react-icons/md";

const SearchHeader = ({deleteMultipleUsers,searchValue,setSearchValue}) => {
  return (
    <div className='searchWrapper'>
      <div className="searchInput">
      <input type='text' placeholder='search' className='panelSearch'
      value={searchValue}
      onChange={(e)=>setSearchValue(e.target.value)}
      />
      </div>
      <div className="deleteSelectedWrapper">
        <button className='deleteSelectedButton' onClick={deleteMultipleUsers}>
          <MdDeleteOutline size={30} color='white'/>
        </button>
      </div>
    </div>
  )
}

export default SearchHeader