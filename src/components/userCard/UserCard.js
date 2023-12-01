import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import './userCard.css';
const UserCard = ({
    userData, 
    updateSelectedUsers, 
    isHeader, 
    isUserSelected,
    deleteSingleUser,
    editUser
})=>{
    const [user,setUser] = useState({
        name: 'Himanshu',
        email: 'him@1234',
        role: 'admin'
    });

    const [isEditing,setIsEditing] = useState(false);


    const setIsSelected = ()=>{
            if(!isUserSelected) updateSelectedUsers(true,userData?.id);
            else updateSelectedUsers(false,userData?.id);
    }
    
    useEffect(()=>{
        setUser({
            name: userData?.name,
            email: userData?.email,
            role: userData?.role,
        })
    },[userData])
    
    const updateUser = (type,value)=>{
        setUser(prev=>({
            ...prev,
            [type]:value
        }))
    }
    return (
        <div className="maindiv">
            <div className="checkbox">
                <input type="checkbox" name="selectedUserCheckbox" 
                    checked={isUserSelected} 
                    onChange={()=>setIsSelected()}/>
            </div>
            <div className="name">
                {isEditing ? 
                <input type="text" value={user?.name} onChange={(e)=>updateUser('name',e.target.value)}/>
            
                :user?.name}
            </div>
            <div className="email">
                {isEditing ? <input type="text" value={user?.email} onChange={(e)=>updateUser('email',e.target.value)}/>:
                user?.email}
            </div>
            <div className="role">
                {isEditing ? <input type="text" value={user?.role} onChange={(e)=>updateUser('role',e.target.value)}/>:
                user?.role}
            </div>
            <div className="actionButtons">
                {isHeader?(
                    <span>actions</span>
                ):(
                    <>
                    <button onClick={()=>setIsEditing(prev=>!prev)}>
                    {isEditing?<FaCheck className="userSaveButton" size={20}/>:<FiEdit className="usereditButton" size={20}/>}
                    </button>
                    <button onClick={()=> deleteSingleUser(userData?.id)}>
                    <MdDeleteOutline className="userdeleteButton" color="red" size={20}/>
                    </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserCard;