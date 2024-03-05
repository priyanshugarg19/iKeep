import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const adminPrivateRoute = () => {
  const {currentUser} = useSelector(state => state.user )
  return (
    <div>
      {

        currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to='/createPost' />
 
      }
    </div>
  )
}

export default adminPrivateRoute
