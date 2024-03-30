import { useEffect } from 'react';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [errorHandle, setErrorHandle] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModals, setShowModals] = useState(false);
    const [commentToDel, setCommentToDel] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            setErrorHandle("Limit Exceeded");
            return;
        }

        try {
            const res = await fetch('/api/comment/create', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: comment,
                    userId: currentUser._id,
                    postId
                })
            })
            const data = await res.json();
            if (!res.ok) {
                setErrorHandle(data.message);
            }
            else {
                console.log(data.message);
                setComment('');
                setComments([data, ...comments])
                setErrorHandle(null);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments/${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                }
                else {
                    setComments(data);

                }
            } catch (error) {

            }
        }
        getComments()
    }, [postId])

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const res = await fetch(`/api/comment/Commentlike/${commentId}`, {
                method: "PUT"
            })
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map(comment =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                ))

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (comment, editedComment) => {
        try {
            setComments(comments.map((c) =>
                c._id == comment._id ? ({ ...c, content: editedComment }) : c));

        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete= async ()=>{
        try {
            if(!currentUser){
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/commentdelete/${commentToDel}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            else{
                setShowModals(false);
                setComments(comments.filter((comment)=>commentToDel !== comment._id));
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
                    <textarea onChange={(e) => setComment(e.target.value)} value={comment} maxlength="200" rows='4' className='no-scrollbar bg-transparent dark:focus:ring-slate-600 focus:ring-gray-200 border-2 border-gray-200 dark:border-gray-600 shadow-2xl outline-none w-full placeholder:dark:text-white/70 placeholder:text-gray-600 rounded-lg transition-all resize-none' type='text' placeholder='Write a comment..' name='comment'></textarea>
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
            {comments.length == 0 && currentUser ? (
                <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
                    <div className='flex-shrink-0 mr-3'>
                        <img className='2-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600' src={currentUser.photoUrl} alt="user" />
                    </div>
                    <div className='flex-1'>
                        <div className='flex items-center mb-1'>
                            <span className='font-bold mr-1 text-xs truncate'>{currentUser ? `@${currentUser.username}` : "Sign In"}</span>
                        </div>
                        <p className='text-gray-500 dark:text-gray-500 pb-2'>Be the first one to comment...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-2'>
                        <p>Comments</p>
                        <div className='border border-gray-400 dark:border-gray-600 py-1 px-2 rounded-md'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((currElem) => {
                        return (<Comment key={currElem._id} 
                        comment={currElem} 
                        onLike={handleLike} 
                        onEdit={handleEdit} 
                        onDelete={(commentid) => { 
                            setShowModals(true); 
                            setCommentToDel(commentid);
                            }} />)
                    })}
                </>
            )}

            {
      showModals &&
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
              
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      
                      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white dark:bg-[rgb(35,39,42)] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                              </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200" id="modal-title">Delete Comment</h3>
                              <div className="mt-2">
                                <p className="text-sm dark:text-gray-400 text-gray-500">Are you sure you want to delete this comment This action cannot be undone.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dark:bg-[rgb(35,39,42)] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 dark:bg-red-800/90 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:hover:bg-red-600/50 sm:ml-3 sm:w-auto">Delete</button>
                          <button onClick={()=> setShowModals(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-400 dark:text-gray-900 hover:dark:bg-gray-500 hover:bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
      }
        </div>
    )
}

export default CommentSection
