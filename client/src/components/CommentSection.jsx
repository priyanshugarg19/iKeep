import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CommentSection({postId}) {
    const {currentUser} = useSelector((state)=>state.user);
    const [comment, setComment] = useState('');
    const [errorHandle, setErrorHandle] = useState(null);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(comment.length> 200){
            setErrorHandle("Limit Exceeded");
            return;
        }

        try {
            const res=await fetch('/api/comment/create',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    content : comment,
                    userId: currentUser._id,
                    postId
                })
            })
            const data= await res.json();
            if(!res.ok){
                setErrorHandle(data.message);
            }
            else{
                console.log(data.message);
                setComment('');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {
            currentUser ? 
            (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img className='w-5 h-5 rounded-full' src={currentUser.photoUrl} alt="" />
                    <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                        @ {currentUser.username}
                    </Link>
                </div>

            )
            :
            (
                <div className='text-sm my-5'>
                    You must be signed in to comment.
                    <Link className='ml-1 text-cyan-600 hover:underline' to='/sign-in'>
                        Sign In
                    </Link>
                </div>
            )
        }
        {
            currentUser &&
            <form onSubmit={handleSubmit}>
                <textarea onChange={(e)=>setComment(e.target.value)} value={comment} maxlength="200" rows='4' className='no-scrollbar bg-transparent dark:focus:ring-slate-600 focus:ring-gray-200 border-2 border-gray-200 dark:border-gray-600 shadow-2xl outline-none w-full placeholder:dark:text-white/70 placeholder:text-gray-600 rounded-lg transition-all resize-none' type='text' placeholder='Write a comment..' name='comment'></textarea>
                <div className='flex justify-between items-center mt-5 '>
                    <p className='text-xs italic'>{200 - comment.length} Characters remaining</p>
                    <button type='submit' class="relative inline-flex items-center justify-center p-4 px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                        <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                        <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span class="relative text-white">Submit</span>
                    </button>
                </div>
            </form>
        }
    </div>
  )
}

export default CommentSection
