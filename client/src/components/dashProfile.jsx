import React from 'react';
import { useSelector } from 'react-redux';

function DashProfile() {
    const {currentUser} = useSelector(state=> state.user)
  return (
    <div className='lg:pt-20 max-w-md p-3 mx-auto w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl mr-[8px]'>
            Profile
        </h1>
        <form className='flex flex-col'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden '>
                <img src={currentUser.photoUrl} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray] dark:border-zinc-600' />
            </div>
            <div className='flex flex-col p-6 gap-y-6 items-center'>
                        <article>
                          <label className='dark:text-gray-200'>Username</label>
                          <input autoComplete='off' className="block w-[350px] h-[35px] mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="text" id='username' defaultValue={currentUser.username} placeholder="Username..." />
                        </article>
                        <article>
                          <label className='dark:text-gray-200 '>Email</label>
                          <input autoComplete='off' className="block w-[350px] h-[35px] mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="email" id='email' defaultValue={currentUser.email} placeholder="eg: name@gmail.com" />
                        </article>
                        <article>
                          <label className='dark:text-gray-200'>Password</label>
                          <input autoComplete='off' className="block w-[350px] h-[35px] border mt-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="password" id='password' placeholder=" New Password..." />
                        </article> 
                        <article>
                            <button  className="inline-flex items-center justify-center h-8 w-[350px] px-10 py-0 text-sm font-semibold text-center text-white bg-blue-600 dark:bg-transparent dark:text-gray-200 no-underline align-middle transition duration-200 ease-in bg-transparent dark:border-2 hover:border-2 dark:border-gray-600 border-gray-300 border-b border-solid rounded-full cursor-pointer select-none hover:bg-transparent dark:hover:text-white dark:hover:border-white hover:border-blue-600 hover:text-blue-600  focus:shadow-xs focus:no-underline">
                                UPDATE
                            </button>
                        </article>
            </div>
        </form>
        <div className='text-red-500 dark:text-gray-200 flex justify-between underline underline-offset-6'>
            <span className='cursor-pointer hover:font-semibold'>Delete Account</span>
            <span className='cursor-pointer hover:font-semibold'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile