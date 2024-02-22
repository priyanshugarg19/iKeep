import React from 'react';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className="h-screen bg-[url('./assets/london.jpg')] bg-cover">
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
                    <a href='/dashboard'>About</a>
                    <a href='/dashboard'>SignIn</a>
                    <a href='/sign-up'>SignUp</a>
                    <a href='/dashboard'>Contact</a>
                </nav>
                <div className='flex-col mt-[30%] lg:mt-[38%] text-white flex justify-center items-center'>
                    <h1 className='text-[42px] lg:text-[80px] font-bold '>About Us</h1>
                    <h3 className='text-center mt-18 lg:px-18 sm:px-8 px-8'>
                        Welcome to our platform! We are dedicated to providing a space where individuals can effortlessly create their own blogs. Our user-friendly interface allows you to craft engaging content and share your unique perspectives with the world. Whether you're a seasoned writer or new to blogging, our platform offers the tools and support you need to bring your ideas to life. Join our community today and start sharing your voice through the power of blogging.</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
