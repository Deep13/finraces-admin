import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import { useNavigate } from 'react-router';


const ProtectedRoute = ({element}:any) => {
    // const context =useContext(AuthContext);
    const navigate=useNavigate();
    const isLoggedIn  = localStorage.getItem("isLoggedIn");

    useEffect(()=>{
      if(!isLoggedIn){
        navigate('/login')
      }
    },[navigate,isLoggedIn])
  // if (!IsLoggedIn) {
  //   return <Navigate to="/login"  replace/>;
  // }
  return element;
};

export default ProtectedRoute;
