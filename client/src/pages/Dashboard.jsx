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

      <div className='min-h-screen flex flex-col lg:flex-row'>
      <div>

        <DashSidebar />

      </div>
      <div className=' w-full'>

        {tab==='profile' && <DashProfile />}

      </div>
      </div>
    </>
  )

}

export default Dashboard
