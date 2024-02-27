import {React, useState, useEffect } from 'react';
import Header from '../components/header';
import DashProfile from '../components/dashProfile';
import DashSidebar from '../components/dashSidebar';
import { useLocation } from 'react-router-dom';




function Dashboard() {
  const [tab , setTab]= useState("");
  const location= useLocation();
  
  useEffect(()=>{

    const params= new URLSearchParams(location.search);
    const urlFromTabs = params.get('tab');
    if(urlFromTabs){
      setTab(urlFromTabs)
    }

  },[location.search])


  return (
    <>
    <Header />
      <div>

        <DashSidebar />

      </div>
      <div>

        {tab==='profile' && <DashProfile />}

      </div>
    </>
  )

}

export default Dashboard
