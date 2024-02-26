import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Header from '../components/header';
import logo1 from '../assets/logo1.png';
import {motion} from 'framer-motion';
import {fadeIn} from '../variants.js';
import { Button, Navbar, Spinner, TextInput } from 'flowbite-react'
import OAuth from '../components/oAuth.jsx';

function SignUp() {
  const navigate= useNavigate();
  const[loading,setLoading]= useState(false)
  const[errorMessage, setErrorMessage]=useState(null)
  const [formData,setFormData]=useState({})
  const handleChange= (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password ){
      return setErrorMessage("Please fill all the Fields");
    }
    try{
      setLoading(true);
      const res= await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false)
        return setErrorMessage(data.message);
      }
      else{
       navigate('/signin');
      }
    }
    catch(err){
      setErrorMessage(err.message);
      setLoading(false)
    }
  }
  
  return (
    <>
      <motion.div
        initial={{width:0}}
        animate={{width:"100%"}}
        exit={{x:"100%"}}
        className="h-screen bg-[url('./assets/london.jpg')] bg-cover">
        <div className='flex h-screen'>
        {/* left division */}
            <motion.div
              // variants={fadeIn('right', 0.1)}
              // initial='hidden'
              // whileInView={'show'}
              // viewport={{once: false, amount: 0.1}} 
              className='flex order-1 bg-white bg-opacity-60 justify-center items-center w-[0px] lg:flex-1'>
                <div>
                    <img src={logo1} />
                </div>
            </motion.div>
        {/* right division */}
            <motion.div
              // variants={fadeIn('left', 0.1)}
              // initial='hidden'
              // whileInView={'show'}
              // viewport={{once: false, amount: 0.1}} 
              className='flex-1 bg-black bg-opacity-90 flex-col ease-in duration-75'>
                <nav className='text-white text-[13px] lg:text-[20px] opacity-80 flex justify-evenly mt-8'>
                    <a href='/'>Home</a>
                    <a href='/dashboard'>SignIn</a>
                    <a href='/sign-up'>SignUp</a>
                    <a href='/dashboard'>Contact</a>
                </nav>
                <div className='flex justify-center items-center mt-[29%] pr-20'>
                  <form onSubmit={handleSubmit} className=' w-[320px] h-[320px] '>
                    <div className='flex flex-col p-6 gap-y-6'>
                        <article>
                          <label className='text-white'>Username</label>
                          <input type="text" id='username' onChange={handleChange} className="block w-[350px] h-[35px] border caret-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pr-10 rounded-lg" placeholder="Username..." />
                        </article>
                        <article>
                          <label className='text-white '>Email</label>
                          <input type="email" id='email' onChange={handleChange} className="block w-[350px] h-[35px] border caret-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pr-10 rounded-lg" placeholder="eg: name@gmail.com" />
                        </article>
                        <article>
                          <label className='text-white'>Password</label>
                          <input  id='password' onChange={handleChange} className="block w-[350px] h-[35px] border caret-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pr-10 rounded-lg" type='password' placeholder="Password..." />
                        </article> 
                        <button type='submit' disabled={loading} class="w-[350px] relative inline-flex items-center justify-center py-[8px] overflow-hidden font-medium transition duration-300 ease-out border-2 border-white rounded-full shadow-md group">
                          
                          {
                            loading ? (
                              <div role="status">
                              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span class="sr-only">Loading...</span>
                              </div>
                            ) : (<><span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-white/40 group-hover:translate-x-0 ease">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </span>
                          <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Sign up
                            </span>
                          <span class="relative invisible">Button Text</span></>)}
                        </button> 
                        <OAuth />
                        <Link className='text-white leading-[0]' to="/sign-in">
                          Already have an account?
                        </Link>   
                        {
                          errorMessage && <motion.div 
                          variants={fadeIn('left', 0.1)}
                          initial='hidden'
                          whileInView={'show'}
                          viewport={{once: false, amount: 0.1}}
                          className=' text-white'> {errorMessage }
                          </motion.div>
                        }               
                    </div>
                  </form>
                </div>
            </motion.div>
        </div>
    </motion.div>
    </>
  )
}

export default SignUp
