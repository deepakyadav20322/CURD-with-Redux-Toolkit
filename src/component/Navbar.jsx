// import  { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchUser } from '../features/userDetailSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchData,setSearchData] = useState("");


  const allusers = useSelector((data)=>data.app.users);
  console.log(allusers);
useEffect(()=>{
  dispatch(searchUser(searchData))

},[searchData]);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid ">
          <h4 className="navbar-brand">Redux/Toolkit Fun</h4>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link to="/" className=" btn btn-primary text-white nav-link fw-bold me-2">
                  Create User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className=" btn btn-primary text-white ms-1 nav-link fw-bold ">
                
                  All Users<span className='rounded-circle bg-danger px-2 py-1 mx-1'>{allusers.length}</span> 
                  </Link>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search users by name...."
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              style={{background:'white',color:'black'}}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar