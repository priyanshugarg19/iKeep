import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { IoMdLogOut } from "react-icons/io";

function DashSidebar() {
    const {currentUser} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const [activeButton, setActiveButton] = useState('dashboard');
    const navigate = useNavigate();
    const location = useLocation();
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        navigate(`/dashboard?tab=${buttonName}`);
    };
    
    useEffect(()=> {
      const tab = window.location.href.split('/')[3];
      if(tab === 'dashboard?tab=profile'){
        setActiveButton('profile');
      }
      else if(tab === 'dashboard?tab=posts'){
        setActiveButton('posts');
      } 
      else if(tab === 'dashboard?tab=users'){
        setActiveButton('users');
      }
    }, [location.search])
  

    const handleSignout = async()=> {
        try {
          const res = await fetch("/api/user/signout", {
            method: 'POST'
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message)
          }
          else{
            dispatch(signOutSuccess());
            navigate('/sign-in');
          }
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <aside class="lg:flex lg:flex-col lg:w-64 w-full lg:h-full px-4 py-8 overflow-y-auto border-b-2 lg:border-r lg:rtl:border-r-0 lg:rtl:border-l dark:border-[rgb(35,39,42)] dark:bg-[rgb(35,39,42)]">
            <a href="#" class="mx-auto">
                <img class="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
            </a>

            <div class=" hidden lg:flex flex-col items-center mt-6 -mx-2">
                <img class="object-cover w-24 h-24 mx-2 rounded-full" src={currentUser.photoUrl} alt="avatar" />
                <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{currentUser.username}</h4>
                <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 ">{currentUser.email.slice(0,19)}....</p>
            </div>
            <hr className='mt-8'></hr>
            <div class="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <button onClick={() => handleButtonClick('profile')} className={`flex items-center w-full lg:w-[220px] px-4 py-2 text-gray-600  rounded-lg  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600/20 dark:hover:text-gray-200 hover:text-gray-700 ${activeButton === 'profile' && 'dark:bg-gray-600/20 dark:text-white bg-gray-200'}`}>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className='flex flex-row justify-between w-full'>
                          <span class="mx-4 font-medium">Profile</span>
                          <span className={`${activeButton === 'profile' && 'dark:bg-[rgb(35,39,42)]/100'} dark:bg-gray-600 bg-sky-600 text-gray-200 font-semibold  text-[14px] rounded-lg w-14`}>{currentUser.isAdmin ? "admin" : "user"}</span>
                        </div>
                    </button>

                    {/* <button onClick={() => handleButtonClick('accounts')} class={`flex lg:w-[220px] w-full items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/20 dark:hover:text-gray-200 hover:text-gray-700 ${activeButton === 'dashboard' && 'dark:bg-gray-600/20 text-white bg-gray-100'}`} >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span class="mx-4 font-medium">Accounts</span>
                    </button>*/}

                    { currentUser.isAdmin &&
                      <button onClick={() => handleButtonClick('posts')} class={`flex lg:w-[220px] w-full items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600/20 dark:hover:text-gray-200 hover:text-gray-700 ${activeButton === 'posts' && 'dark:bg-gray-600/20 dark:text-white bg-gray-200'}`} href="#">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="mx-4 font-medium">Posts</span>
                      </button> 
                    }
                    { currentUser.isAdmin &&
                      <button onClick={() => handleButtonClick('users')} class={`flex lg:w-[220px] w-full items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600/20 dark:hover:text-gray-200 hover:text-gray-700 ${activeButton === 'users' && 'dark:bg-gray-600/20 dark:text-white bg-gray-200'}`} href="#">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="mx-4 font-medium">users</span>
                      </button> 
                    }

                    <button onClick={handleSignout} class={`flex lg:w-[220px] w-full items-center px-[10px] py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/20 dark:hover:text-gray-200 hover:text-gray-700 ${activeButton === 'signout' && 'dark:bg-gray-600/20 dark:text-white bg-gray-100'}`}>
                        <IoMdLogOut className='w-[30px] h-[22px] ' />
                        <span class="mx-4 font-medium">Sign Out</span>
                    </button>
                </nav>
            </div>
    </aside>
  )
}

export default DashSidebar
