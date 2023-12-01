import { useEffect, useState } from "react";
import PanelFooter from "./components/panelFooter/PanelFooter";
import SearchHeader from "./components/searchHeader/SearchHeader";
import UserCard from "./components/userCard/UserCard";

function App() {
  const [users,setUsers] = useState([{}]);
  const [filteredUsers,setFilteredUsers] = useState(users);

  const [pageNo,setPageNo] = useState(1);
  const [selectedUsers,setSelectedUsers] = useState([]);
  const [isAllSelected,setIsAllSelected] = useState(false);
  const [searchValue,setSearchValue] = useState("");

  const updateSelectedUsers = (shouldAdd,id)=>{
    if(id!== -1){
      if(shouldAdd) setSelectedUsers(prev=> [...prev,id])
      else setSelectedUsers(selectedUsers?.filter((item)=> item!==id))
    }else{
      setIsAllSelected(prev=>!prev)
      if(shouldAdd) {
        let allUsersId = [];
        filteredUsers?.filter((user,index)=> shouldShow(index)).map((user) => allUsersId.push(user?.id));
        setSelectedUsers(allUsersId);
      }
      else setSelectedUsers([]);
    }
  }
  useEffect(()=>{
    setFilteredUsers(users?.filter((user)=>filteredQuery(user)))
  },[searchValue,users])

  useEffect(()=>{
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then((res)=> res.json())
    .then((results)=> setUsers(results))
    .catch(error => console.log(error));
  },[])

  const deleteSingleUser = (userId)=>{
    setUsers(prev=> prev.filter(user => user?.id !== userId));
    setSelectedUsers(prev=> prev.filter(item => item !== userId));
  }

  const deleteMultipleUsers = ()=>{
    setUsers(prev=> prev.filter(user => !selectedUsers?.includes(user?.id)));
    setSelectedUsers([]);
    setIsAllSelected(false);
  }
  const shouldShow = (index)=>{
    return  index+1 > 10*(pageNo-1) && index+1 <= 10*(pageNo)
  }

  const filteredQuery = (user)=>{
      if(searchValue === "") return true;
      return user?.name?.toLowerCase()?.startsWith(searchValue)
         || user?.email?.toLowerCase()?.startsWith(searchValue)
         || user?.role?.toLowerCase()?.startsWith(searchValue);

  }

  const editUser = (userId)=>{
    setUsers(prev=>[...prev,{name:'ss',id:11,role:'sds',email:'sdsd@vsd'}])
  }

  return (
    <>
      <SearchHeader deleteMultipleUsers={deleteMultipleUsers}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              />
      <UserCard 
              userData={{name:'Name',email:'Email',role:'Role',id: -1}}
              updateSelectedUsers={updateSelectedUsers}
              isHeader={true}
              isUserSelected={isAllSelected}
              />
      {
       filteredUsers?.filter((user,index)=> shouldShow(index))
          .map((user)=>
            <UserCard 
              userData={user} key={user?.id} 
              updateSelectedUsers={updateSelectedUsers}
              isUserSelected = {selectedUsers?.includes(user?.id)}
              deleteSingleUser={deleteSingleUser}
              editUser={editUser}
              />
      )
      }
      {filteredUsers.length === 0 && (
        <div className="maindiv">No data to show.</div>
      )}
      <PanelFooter 
        totalUsers={filteredUsers?.length} 
        setPageNo={setPageNo}
        pageNo={pageNo}
        selectedUsers={selectedUsers}
        />
        
    </>
  )
}

export default App;
