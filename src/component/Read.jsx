
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../features/userDetailSlice'
import CustomeModel from './CustomeModels'
import { deleteUser} from '../features/userDetailSlice'



const Read = () => {

const [id,setId] =useState();
const [showPopup, setshowPopup] = useState(false);
const [radioData, setRadioData] = useState("");

    const {users,loading,searchData} = useSelector((state)=>state.app) ;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(showUser())
    },[]);
    
    if (loading) {
        return   <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}><div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></div>;
      }

  return (
    <div>
        <h2>All Users</h2>
        {showPopup && <CustomeModel id={id} showPopup={showPopup} setshowPopup={setshowPopup}/>}

        <input
        className="form-check-input"
        name="gender"
        checked={radioData === ""}
        type="radio"
        onChange={(e) => setRadioData("")}
      />
      <label class="form-check-label">All</label>
      <input
        className="form-check-input ms-1"
        name="gender"
        checked={radioData === "Male"}
        value="Male"
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Male</label>
      <input
        class="form-check-input ms-1"
        name="gender"
        value="Female"
        checked={radioData === "Female"}
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Female</label>

        <div>
            {users && users .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
                if (radioData === "Male") {
                  return ele.gender === radioData;
                } else if (radioData === "Female") {
                  return ele.gender === radioData;
                } else return ele;
              })

            .map((ele)=>(
                 <div key={ele.id} className="card mx-auto my-2" style={{width:'50%'}}>
                 <div className="card-body">
                   <h5 className="card-title">{ele.name}</h5>
                   <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                   <p className="card-text">Gender :- {ele.gender}</p>
                   <button onClick={() => [setId(ele.id), setshowPopup(true)]} className="card-link btn btn-success">View</button>
                   <Link to={`/edit/${ele.id}`} className="btn btn-secondary card-link">Edit</Link>
                   <Link   onClick={() => dispatch(deleteUser(ele.id))} className="btn btn-danger card-link">Delete</Link>
                 </div>
               </div>
            ))}
        
        </div>
    </div>
  )
}

export default Read