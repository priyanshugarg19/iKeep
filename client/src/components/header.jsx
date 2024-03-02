import { Button, Navbar, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom';
import React from 'react';
import logo1 from '../assets/logo1.png';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';


function Header() {

  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {currentUser} = useSelector(state => state.user);

  const handleSignout=async ()=>{
    try {
        const res= await fetch('/api/user/signout',{
            method : 'POST'
        });
        const data= await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
            dispatch(signOutSuccess(data))
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <nav className=' z-50 fixed top-0 w-full bg-white px-2 py-2.5 dark:border-b dark:border-[rgb(35,39,42)] dark:bg-[rgb(35,39,42)] sm:px-4 border-b-2'>
      <div className='mx-auto flex flex-wrap items-center justify-between container'>
        <Link to='/'>
          <img src={logo1} className='w-[120px] h-[40px] '/>
        </Link>
        <form>
          <div className="hidden lg:inline">
            <div className="relative w-full">
              <div data-testid="right-icon" className="pointer-events-none absolute  inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-500 dark:text-gray-400" height="1em" width="1em" ></div>
                <input className="block w-full border caret-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-[rgb(44,47,51)] dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:caret-gray-200 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="text" placeholder="Search..." />
                <AiOutlineSearch className='absolute top-3 right-3 dark:text-gray-300' />
            </div>
          </div>
        </form>
        <Button className='w-12 h-10 lg:hidden rounded-full dark:border-4 dark:bg-zinc-600 dark:border-zinc-700' color='gray'>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-4 md:order-2'>
        <button type="button" onClick={()=> dispatch(toggleTheme())} className="group items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none dark:border-gray-500 border-[1px] text-white hover:bg-gray-200 dark:hover:bg-zinc-700  w-12 h-10 rounded-full hidden sm:inline"><span className="flex items-center transition-all duration-200 rounded-full text-sm px-4 py-2">
          {theme === 'light' ?
            (<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-black text-center" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" outline></path></svg>)
            :
            (<svg  class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
            </svg>)
            }
            </span>
            </button>
              
              {
                currentUser ? 
              ( <div className='group cursor-pointer relative'>
                  <img className='w-[40px] h-[40px] border-2 dark:border-gray-600 rounded-full' src={currentUser.profilePicture} />
                  <div className='flex flex-col py-2 px-2 absolute right-4 top-10 bg-white dark:bg-[rgb(35,39,42)] rounded-lg group-hover:visible invisible w-[150px] md:w-[250px] h-[140px] border-2 dark:border-gray-600 text-center'>
                    <span className='text-sm text-gray-900 dark:text-gray-400'>@{currentUser.username}</span>
                    <span className='text-sm font-semibold truncate dark:text-gray-200 text-gray-800'>{currentUser.email}</span>
                    <Link className='mt-2 border-2 border-blue-500 bg-blue-500 dark:hover:bg-black/20 dark:border-gray-600 dark:bg-transparent dark:bg-gray-600 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-300 hover:bg-blue-600 text-white rounded-full' to="/dashboard?tab=profile">
                      Profile
                    </Link>
                    <Link className='hover:text-blue-500 py-[1.5px] dark:py-[0px] hover:py-[2px] dark:border-gray-600 dark:hover:border-[2px] dark:hover:text-white dark:text-gray-200 dark:hover:border-white dark:bg-sky-600 hover:bg-white mt-2 border-2 text-white hover:border-blue-500 bg-blue-500  transition delay-55 ease-in-out duration-200  font-semibold rounded-full' to="/dashboard">
                      Logout
                    </Link>
                  </div>
                </div>)
                 :
                (<div className='bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full'>  
                  <Link to='sign-in'>
                  <button type="button" className="group rounded-full flex m-0.5 text-black items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none hover:text-white bg-gradient-to-br from-white to-white hover:from-purple-600 hover:to-cyan-500  dark:focus:ring-cyan-800 focus:ring-2"><span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">Sign In</span></button>
                  </Link>
                </div>)
              }

          
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        </div>
        
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white md:dark:bg-transparent dark:border-gray-700 dark:bg-[rgb(44,47,51)]">
              <li>
                <a href="/" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
              </li>
              <li>
                <a href="/about" className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              <li>
                <a href="/projects" className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Projects</a>
              </li>
            </ul>
        </div>
      </div>
     </nav>
  )
}

export default Header

        {/* <Button classNameName='w-12 h-10 lg:hidden rounded-full' color='gray'>
          <AiOutlineSearch />
        </Button>
        <div>
          <Button classNameName='w-12 h-10 hidden sm-inline rounded-full' color='black'>
              <FaMoon />
          </Button>
          <Link to='sign-in'>
            <Button gradientDuoTone="purpleToBlue">
              Sign In
            </Button>
          </Link>
        </div> */}

