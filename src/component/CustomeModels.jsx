import React from 'react'
import './CustomeModel.css'
import { useSelector } from 'react-redux'

const CustomeModels = ({id,setshowPopup,showPopup}) => {

  const allusers =  useSelector((state)=>state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log("singleuser", singleUser);



  return (
    <div className='modalBackground' onClick={()=>setshowPopup(false)}>
        <div className="modalContainer">
        <button className='btn btn-danger' onClick={() => setshowPopup(false)}>Close</button>
        <h3>Name:- {singleUser[0].name}</h3>
        <h3>Email:- {singleUser[0].email}</h3>
        <h3>Age:- {singleUser[0].age}</h3>
        <p>Gender:- {singleUser[0].gender}</p>
        </div>
    </div>
  )
}

export default CustomeModels