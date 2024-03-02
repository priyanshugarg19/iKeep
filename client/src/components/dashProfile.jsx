import {React, useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';
import { CircularProgressbar } from 'react-circular-progressbar';
import { updateStart, updateFailure,updateSuccess, deleteFailure, deleteStart, deleteSuccess, signOutSuccess } from '../redux/user/userSlice';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
function DashProfile() {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const {currentUser , error} = useSelector(state=> state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData]= useState({})
    const [buttonBool, setButtonBool]= useState(false)
    const [updatingSuccess, setUpdatingSuccess]= useState(null);
    const [updatingError, setUpdatingError]= useState(null);
    const [modal, setModal]= useState(false);
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      } 
    };  
    
    useEffect(()=> {
      if(imageFile){
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async() => {
      setButtonBool(true);
      setImageUploadError(null);
      console.log('file is uploading...');
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
            // console.log(`upload is ${progress} done...`);
        },
        (error) => {
          setButtonBool(false);
          setImageUploadError("Image couldn't be uploaded (note: File must be less than 2mb)");
          setImageUploadProgress(null);
        },
        () => {
          setButtonBool(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setImageUploadProgress(null);
            setFormData({...formData, photoUrl : downloadUrl})
          });
        }
      );
    }
    const handleChange=(e)=>{
      setUpdatingError(null);
      setUpdatingSuccess(null);
      setFormData({...formData, [e.target.id]: e.target.value})
    }
    
    const handleSubmit=async (e)=>{
      e.preventDefault();
      setUpdatingError(null);
      setUpdatingSuccess(null);
      if(Object.keys(formData).length==0){
        setUpdatingError('No Changes Made')
        return;
      }
      try {
        dispatch(updateStart());
        const res= await fetch(`/api/user/update/${currentUser._id}`,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData) 
        })
        const data= await res.json();
        if(!res.ok){
          setUpdatingError(data.message);
          dispatch(updateFailure(data.message));
        }
        else{
          dispatch(updateSuccess(data));
          setUpdatingSuccess('Profile Updated Successfully');
        }

      } catch (error) {
        setUpdatingError(error.message)
        dispatch(updateFailure(error.message))
      }
    }

    const handleDelete=async ()=>{
      setModal(false);
      try {
        dispatch(deleteStart())
        const res= await fetch(`/api/user/delete/${currentUser._id}`,{
          method: 'DELETE'
        })
        const data = await res.json()
        if(res.ok){
          dispatch(deleteSuccess(data))
          navigate('/')
        
        }
        else{
          dispatch(deleteFailure(data.message));
        }
      } catch (error) {
        dispatch(deleteFailure(error.meassage));
      }
    }
    
    const handleSignout=async()=>{
      try {
        const res = await fetch("/api/user/signout",{
          method : 'POST'
        })
        const data = await res.json();
        if(!res.ok){
          console.log(data.message)
        }
        else{
          dispatch(signOutSuccess(data))
        }
        
      } catch (error) {
        console.log(error);
      }
    
    }

  return (
    <div className='lg:pt-20 max-w-xl p-3 mx-auto w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl mr-[8px]'>
            Profile
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input type='file'  accept='image/*' onChange={handleImageChange} className='hidden' ref={filePickerRef}/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={() => filePickerRef.current.click()}>
                {
                  imageUploadProgress && 
                  <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`} 
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 50
                      },
                      path: {
                        stroke: `rgb(62, 152, 199, ${imageUploadProgress / 100})`
                      }
                    }}
                  />
                }
                <div className={`h-full w-full absolute top-0 left-0 ${ imageUploadProgress && imageUploadProgress < 100 && 'filter blur-sm' }`}>
                  <img src={imageFileUrl || currentUser.photoUrl} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] dark:border-zinc-600`} />
                </div>
            </div>
            {
                          imageUploadError && 
                          <motion.div variants={fadeIn('left', 0.3)}
                              initial='hidden'
                              whileInView={'show'}
                              viewport={{once: false, amount: 0.3}}   
                              className='ml-2'>
                              <div className='text-center font-semibold dark:text-red-500/80 border-b bg-red-600 text-white border-black py-1 dark:border-none dark:bg-black/40 p-2 text-[13px] mt-6 rounded-full w-[400px]'>
                              {imageUploadError}
                              </div>
                              </motion.div>
                        }  
            <div className='flex flex-col p-6 gap-y-6 items-center'>
                          <article>
                            <label className='dark:text-gray-200'>Username</label>
                            <input autoComplete='off' onChange={handleChange} className="block w-[350px] h-[35px] lg:w-[550px] mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="text" id='username' defaultValue={currentUser.username} placeholder="Username..." />
                          </article>
                          <article>
                            <label className='dark:text-gray-200 '>Email</label>
                            <input autoComplete='off' onChange={handleChange} className="block w-[350px] h-[35px] lg:w-[550px] mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="email" id='email' defaultValue={currentUser.email} placeholder="eg: name@gmail.com" />
                          </article>
                          <article>
                            <label className='dark:text-gray-200'>Password</label>
                            <input autoComplete='off' onChange={handleChange} className="block w-[350px] h-[35px] lg:w-[550px] border mt-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm pr-10 rounded-lg" type="password" id='password' placeholder=" New Password..." />
                          </article> 
                          <article>
                              <button onClick={()=> console.log('clicked')} type='submit' disabled={buttonBool} class={`inline-flex items-center justify-center h-8 w-[350px] lg:w-[550px] px-10 py-0 text-sm font-semibold text-center bg-sky-600 text-white dark:bg-transparent dark:text-gray-200 no-underline align-middle transition duration-200 ease-in dark:border-2 hover:border-2 dark:border-gray-600 border-gray-300 border-b border-solid rounded-full cursor-pointer select-none hover:bg-transparent dark:hover:text-white dark:hover:border-white hover:border-sky-600 hover:text-sky-600 ${buttonBool && 'bg-opacity-20 dark:text-opacity-15 dark:border-opacity-20 dark:hover:border-white/5 dark:hover:text-white/20'} focus:shadow-xs focus:no-underline`}>
                                  UPDATE
                              </button>
                          </article>
            </div>
        </form>
        <div className='text-red-500 dark:text-gray-200 flex justify-between underline underline-offset-6'>
            <span onClick={()=>{setModal(true)}} className='cursor-pointer hover:font-semibold'>Delete Account</span>
            <span onClick={handleSignout} className='cursor-pointer hover:font-semibold'>Sign Out</span>
        </div>
        <article className=' flex justify-center items-center'>
            {
              updatingError && 
              <motion.div variants={fadeIn('left', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{once: false, amount: 0.3}}   
                  className='ml-2'>
                  <div className='w-[350px] lg:w-[550px] text-center font-semibold dark:text-red-500/80 border border-red-600 bg-red-800/20 text-red-600 py-1 dark:border-none dark:bg-black/40 p-2 text-[13px] mt-6 rounded-full'>
                  {updatingError}
                  </div>
                  </motion.div>
            }
            {
              updatingSuccess && 
              <motion.div variants={fadeIn('left', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{once: false, amount: 0.3}}   
                  className='ml-2'>
                  <div className='text-center font-semibold dark:text-green-500/80 border-b bg-green-300 text-green-600 border-green-600 py-1 dark:border-none dark:bg-green/40 p-2 text-[13px] mt-6 rounded-full w-[350px] lg:w-[550px]'>
                  {updatingSuccess}
                  </div>
                  </motion.div>
            }
            { error
               && 
              <motion.div variants={fadeIn('left', 0.3)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{once: false, amount: 0.3}}   
                  className='ml-2'>
                  <div className='w-[350px] lg:w-[550px] text-center font-semibold dark:text-red-500/80 border border-red-600 bg-red-800/20 text-red-600 py-1 dark:border-none dark:bg-black/40 p-2 text-[13px] mt-6 rounded-full'>
                  {error}
                  </div>
                  </motion.div>
            }
        </article>
        {
          modal && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
    {/* Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
   */}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white  dark:bg-[rgb(35,39,42)] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full dark:bg-red-300 bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6  text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6  dark:text-gray-200 text-gray-900" id="modal-title">Deactivate account</h3>
              <div class="mt-2">
                <p class="text-sm  dark:text-gray-400 text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50  dark:bg-[rgb(35,39,42)] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={handleDelete} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 dark:bg-red-800 dark:hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
          <button onClick={()=>{setModal(false)}} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-400 dark:text-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:hover:bg-gray-500 hover:bg-gray-200 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
        }
    </div>
  )
}

export default DashProfile
