import { Button, Navbar, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom';
import React from 'react';
import logo1 from '../assets/logo1.png';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';

function Header() {
  const path = useLocation().pathname;
  return (
    <nav className='bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 border-b-2'>
      <div className='mx-auto flex flex-wrap items-center justify-between container'>
        <Link to='/'>
          <img src={logo1} className='w-[120px] h-[40px]'/>
        </Link>
        <form>
          <div className="hidden lg:inline">
            <div className="relative w-full">
              <div data-testid="right-icon" className="pointer-events-none absolute  inset-y-0 right-0 flex items-center pr-3 h-5 w-5 text-gray-500 dark:text-gray-400" height="1em" width="1em" ></div>
                <input className="block w-full border caret-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pr-10 rounded-lg" type="text" placeholder="Search..." />
                <AiOutlineSearch className='absolute top-3 right-3' />
            </div>
          </div>
        </form>
        <Button className='w-12 h-10 lg:hidden rounded-full' color='gray'>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-4 md:order-2'>
        <button type="button" className="group items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none border-[1px] text-white hover:bg-gray-200 focus:ring-2 w-12 h-10 rounded-full hidden sm:inline"><span className="flex items-center transition-all duration-200 rounded-full text-sm px-4 py-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-black text-center" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" outline></path></svg></span></button>
          <div className='bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full'>
              <Link to='sign-in'>
                <button type="button" className="group rounded-full flex m-0.5 text-black items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none hover:text-white bg-gradient-to-br from-white to-white hover:from-purple-600 hover:to-cyan-500  dark:focus:ring-cyan-800 focus:ring-2"><span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">Sign In</span></button>
              </Link>
          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        </div>
        
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
              </li>
              <li>
                <a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              <li>
                <a href="/projects" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Projects</a>
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

