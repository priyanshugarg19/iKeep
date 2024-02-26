import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const auth = getAuth(app);
  const provider= new GoogleAuthProvider();

  const handleGoogleClick=async () =>{
    provider.setCustomParameters({prompt:'select_account'})
    try {
      const resultsFromGoogle = await signInWithPopup(auth ,provider)
      console.log(resultsFromGoogle);

      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          photo: resultsFromGoogle.user.photoURL
        })
        
      })
      const data =await res.json();
      if (res.ok){
        dispatch(signInSuccess(data));
        navigate("/dashboard")
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  return (

    <button type='button' onClick={handleGoogleClick} class="group relative w-[350px] inline-flex items-center justify-center px-6 py-[8px] overflow-hidden font-bold text-white rounded-full shadow-2xl group">
        <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>

        <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

        <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

        <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

        <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
        <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
        <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <FcGoogle className='w-6 h-6 mr-2 z-50 group-hover:border-2 group-hover:rounded-full group-hover:bg-white'/>
        <span class="relative">  Continue with Google</span>
    </button>
  )
}
