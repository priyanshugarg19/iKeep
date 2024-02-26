import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

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

    <button type='button' onClick={handleGoogleClick}  className='w-[350px] relative inline-flex items-center justify-center py-[8px] overflow-hidden font-medium transition duration-300 ease-out border-2 border-white rounded-full shadow-md group text-white ' >
    <AiFillGoogleCircle className='w-7 h-5 mx-2' />
    Sign In With Google</button>
  )
}
