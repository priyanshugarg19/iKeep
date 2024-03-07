import {React, useRef, useState} from 'react';
import Header from '../components/header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import icon from '../assets/icon.jpg';
import newicon from '../assets/newicon.webp';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const filePickerRef = useRef();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const uploadImage = async() => {
        try {
            if(!file){
                setImageUploadError("Please Select an image first...")
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=> {
                    const progress = (snapshot.bytesTransferred)/(snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=> {
                    setImageUploadError("Something went wrong");
                    setImageUploadProgress(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=> {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, image: downloadUrl});
                    })
                }
            );
        } catch (error) {
            setImageUploadError("Image Upload Failed");
            setImageUploadProgress(null);
            console.log(error);
        }
    }
    console.log(formData);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/post/create", {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            
        }
    }
  return (
    <>
        <Header />
            <div className='flex justify-center items-center overflow-auto bg-[url("https://transparenttextures.com/patterns/crissxcross.png")] min-h-screen'>
                <div className='p-3 formmm w-full md:dark:bg-[rgb(35,39,42)]/70  md:bg-white/70 px-4 max-w-3xl mx-auto md:rounded-2xl mt-16 min-h-[660px] '>
                    <div className='flex flex-row justify-center items-center'>
                        <img className='w-[40px] h-[36px] mr-2' src={newicon} />
                        <h1 className='text-center text-[32px] my-4 font-bold dark:text-white'>CREATE A POST</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                            <div className='shadow-2xl w-full'>
                                 <input onChange={(e)=>setFormData({...formData, title: e.target.value})} autoComplete='off' className="inputform block w-full h-[35px] mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 p-2.5 text-sm rounded-lg" type="text" id='title' required placeholder="Title" />
                            </div>
                            <div className='shadow-2xl'>
                                <select onChange={(e)=>setFormData({...formData, category: e.target.value})} className='block h-[35px] w-full max-h-60 mt-2 border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 text-sm pr-10 rounded-lg'>
                                        <option value="" disabled selected hidden>Select a category...</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Education">Education</option>
                                        <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full'>

                            {/* <!-- scroll area --> */}
                            <section class="h-full overflow-auto p-2 w-full flex flex-col"  >
                                <header class="border-dashed rounded-3xl border-2 border-gray-400 py-2 flex flex-col justify-center items-center" >
                                <p class="mb-3 font-semibold text-gray-900 dark:text-gray-200 flex flex-wrap justify-center cursor-pointer" onClick={()=> filePickerRef.current.click()}>
                                    {
                                        file ? (file.name) : 
                                        (<div><span>Click here to select</span>&nbsp;<span>a File and then click upload</span></div>)
                                    }
                                    {
                                        formData.image && (" (Uploaded Successfully)")
                                    }
                                </p>
                                <div className='flex justify-center items-center gap-x-2'>
                                    {
                                       formData.image ? 
                                        <button onClick={uploadImage} disabled={formData.image} type='button' class={`inline-flex items-center justify-center h-6 px-10 py-0 text-sm font-semibold text-center bg-sky-600 text-white dark:bg-transparent dark:text-gray-200 no-underline align-middle transition duration-200 ease-in dark:border-2 hover:border-2 dark:border-gray-600 border-gray-300 border-b border-solid rounded-full cursor-pointer select-none hover:bg-transparent dark:hover:text-white dark:hover:border-white hover:border-sky-600 hover:text-sky-600 ${formData.image && 'bg-opacity-20 dark:text-opacity-15 dark:border-opacity-20 dark:hover:border-white/5 dark:hover:text-white/20 hover:bg-sky-600/20 hover:bg-opacity-50 hover:text-white/40 hover:border-none'} focus:shadow-xs focus:no-underline`}>
                                            UPLOADED
                                        </button>
                                       :
                                        (<button onClick={uploadImage} disabled={imageUploadProgress} type='button' class={`inline-flex items-center justify-center h-6 px-10 py-0 text-sm font-semibold text-center bg-sky-600 text-white dark:bg-transparent dark:text-gray-200 no-underline align-middle transition duration-200 ease-in dark:border-2 hover:border-2 dark:border-gray-600 border-gray-300 border-b border-solid rounded-full cursor-pointer select-none hover:bg-transparent dark:hover:text-white dark:hover:border-white hover:border-sky-600 hover:text-sky-600 ${imageUploadProgress && 'bg-opacity-20 dark:text-opacity-15 dark:border-opacity-20 dark:hover:border-white/5 dark:hover:text-white/20'} focus:shadow-xs focus:no-underline`}>
                                            UPLOAD IMAGE
                                        </button>)
                                    }
                                    {
                                            imageUploadProgress &&
                                            (<div className='w-12 h-12'>
                                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                            </div>)
                                            
                                    }
                                </div>
                                <input disabled={formData.image} id="hidden-input" onChange={(e)=>{setFile(e.target.files[0]); setImageUploadError(null); setImageUploadProgress(null);}} ref={filePickerRef} type="file" accept='image/*' multiple className="hidden" />
                                </header>
                            </section>
                                {/* <div>
                                
                            </div> */}
                        </div>
                        {
                            imageUploadError &&
                            <motion.div variants={fadeIn('left', 0.3)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{once: false, amount: 0.3}}   
                                className='ml-2'>
                                <div className='w-full text-center font-semibold dark:text-red-500/80 border border-red-600 bg-red-800/20 text-red-600 py-1 dark:border-none dark:bg-black/40 p-2 text-[13px] rounded-full'>
                                {imageUploadError}
                                </div>
                            </motion.div>
                        }
                        {
                            formData.image &&
                            (<img src={formData.image} alt='upload' className='w-full h-72 object-cover' />)
                        }
                        <ReactQuill onChange={(value)=>setFormData({...formData, content: value})} theme='snow' placeholder='Write something...' required className='h-64 mb-12'/>
                        {
                            publishError &&
                            <motion.div variants={fadeIn('left', 0.3)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{once: false, amount: 0.3}}   
                                className='ml-2'>
                                <div className='w-full text-center font-semibold dark:text-red-500/80 border border-red-600 bg-red-800/20 text-red-600 py-1 dark:border-none dark:bg-black/40 p-2 text-[13px] rounded-full'>
                                {publishError}
                                </div>
                            </motion.div>
                        }
                        <div className='flex justify-center items-center mt-6 md:mt-0'>    
                        <button onClick={()=> console.log('clicked')} type='submit' class={`inline-flex items-center justify-center h-8 w-[190px] lg:w-[190px] px-10 py-0 text-sm font-semibold text-center hover:bg-sky-600  bg-sky-600 text-gray-200 no-underline align-middle transition duration-200 ease-in border-2 border-gray-200  border-solid rounded-full cursor-pointer select-none  hover:text-white hover:border-white  focus:shadow-xs focus:no-underline`}>
                                  CREATE A POST
                                  </button> 
                        </div>
                        
                    </form>

                </div>  
            </div>
    </>
  )
}

export default CreatePost
