import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Table} from 'flowbite-react';

function DashPosts() {
  const {currentUser} = useSelector((state)=>state.user);
  const [userPosts, setUserPosts]= useState([]);
  const [showMore, setShowMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(null);
  const [showModals, setShowModals] = useState(false);
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();
  useEffect(()=> {
    const fetchPosts = async()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          if(data.totalposts <= 9){
            setShowMore(false);
          }
      
        }

      } catch (error) {
        console.log(error);
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id])

  const handleShowMore = async()=>{
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts([...userPosts, ...data.posts]);
        setTotalPosts(data.totalPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(userPosts.length == totalPosts){
      setShowMore(false);
    }
  },[userPosts])
  
  const handleDelete = async()=>{
    setShowModals(false);
    try {
      const res = await fetch(`/api/post/deletepost/${currentUser._id}/${postId}`,{
        method: 'DELETE'
      })
      const data = await res.json();
      if(res.ok){
        setUserPosts(userPosts.filter((post)=>post._id !== postId))
      }
      if(!res.ok){
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='lg:pt-20 p-3 lg:px-4 '>
      {
        currentUser.isAdmin && userPosts.length > 0 ? 
        (<>
            <div class="relative overflow-x-auto shadow-md rounded-lg no-scrollbar">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-sky-600 dark:bg-[#23272a] dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date Updated
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Post Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Post Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {userPosts.map((currElem, idx)=>{
                      return(
                      
                        <tr class="odd:bg-gray-100 odd:dark:bg-[#23272a] even:bg-gray-50 even:dark:bg-transparent border-b dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {new Date(currElem.updatedAt).toLocaleDateString()}
                            </th>
                            <td class="px-6 py-4">
                                <Link to={`/post/${currElem.slug}`}>
                                  <img src={currElem.image} alt={currElem.title} className='w-20 h-10 object-cover bg-gray-500' />
                                </Link>
                            </td>
                            <td class="px-6 py-4">
                              <Link className='font-medium dark:text-gray-400 text-black' to={`/post/${currElem.slug}`}>
                                {currElem.title.length < 48 ? currElem.title : currElem.title.slice(0,28) + "..."}
                              </Link>
                            </td>
                            <td class="px-6 py-4">
                                {currElem.category}
                            </td>
                            <td class="px-6 py-4">
                                <a onClick={(e)=>{e.preventDefault(); setShowModals(true); setPostId(currElem._id);}} href="#" class="font-medium text-red-500 dark:text-red-500 hover:underline">Delete</a>
                            </td>
                            <td class="px-6 py-4">
                              <Link to={`/update-post/${currElem._id}`}>
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </Link>
                            </td>
                        </tr>
                    )
                    })   
                    }
                  </tbody>
                </table>
                {
                  showMore && 
                  <div className='py-2 text-center'> 
                    <button onClick={handleShowMore} type='button' class={`inline-flex items-center justify-center h-6 w-18 px-10 py-0 text-sm font-semibold text-center bg-sky-600 text-white dark:bg-transparent dark:text-gray-200 no-underline align-middle transition duration-200 ease-in dark:border-2 hover:border-2 dark:border-gray-600 border-gray-300 border-b border-solid rounded-full cursor-pointer select-none hover:bg-transparent dark:hover:text-white dark:hover:border-white hover:border-sky-600 hover:text-sky-600  focus:shadow-xs focus:no-underline`}>
                      Show more
                    </button>  
                  </div>

                }
            </div>
        </>) 
        : 
        (<p>You have no posts yet</p>)
      }
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
                              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200" id="modal-title">Delete post</h3>
                              <div className="mt-2">
                                <p className="text-sm dark:text-gray-400 text-gray-500">Are you sure you want to delete this post? This action cannot be undone.</p>
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

export default DashPosts
