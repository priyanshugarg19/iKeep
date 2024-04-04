import React from 'react';
import logo from '../assets/logo.png';
import {motion} from 'framer-motion';
import {fadeIn} from '../variants.js';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
         className="h-screen bg-[url('./assets/london.jpg')] bg-cover">
        <div className='flex h-screen'>
        {/* left division */}
            <div className=' flex bg-white bg-opacity-60 justify-center items-center w-[0px] lg:flex-1'>
                <div>
                    <img src={logo} />
                </div>
            </div>
        {/* right division */}
            <div className='flex-1 bg-black bg-opacity-50 flex-col'>
                <nav className='text-white text-[13px] lg:text-[20px] opacity-80 flex justify-evenly mt-8'>
                    <a href='/home'>Home</a>
                    <a href='/sign-in'>SignIn</a>
                    <a href='/sign-up'>SignUp</a>
                    <a href='/dashboard'>Contact</a>
                </nav>
                <div className='flex-col mt-[30%] lg:mt-[30%] text-white flex justify-center items-center'>
                    <h1 className='text-[42px] lg:text-[80px] font-bold '>About Us</h1>
                    <h3 className='text-center mt-18 lg:px-18 sm:px-8 px-8'>
                        Welcome to our platform! We are dedicated to providing a space where individuals can effortlessly create their own blogs. Our user-friendly interface allows you to craft engaging content and share your unique perspectives with the world. Whether you're a seasoned writer or new to blogging, our platform offers the tools and support you need to bring your ideas to life. Join our community today and start sharing your voice through the power of blogging.</h3>
                    <Link to="/home">
                        <button type='button' class="group mt-8 border bg-black/50 relative w-[150px] inline-flex items-center justify-center px-6 py-[6px] overflow-hidden font-bold text-white rounded-full shadow-2xl group">
                            <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>

                            <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

                            <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

                            <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

                            <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                            <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                            <span class="relative">Get Started</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default About
