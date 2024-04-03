import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi';
import { Link } from 'react-router-dom';

function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const {currentUser} = useSelector(state=>state.user);

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const res = await fetch('/api/user/getuser?limit=5');
                const data = await res.json();
                if(res.ok){
                    setUsers(data.usersWithoutPass);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPosts = async()=>{
            try {
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchComments = async()=>{
            try {
                const res = await fetch('/api/comment/getallcomments?limit=5');
                const data = await res.json();
                if(res.ok){
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(currentUser.isAdmin){
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    },[currentUser])

  return (
    <div className='lg:pt-20 p-3 lg:px-4'>
        <div className='flex-wrap flex gap-4 justify-center'>
            <div className='flex flex-col p-3 dark:bg-[#23272a] gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                        <p className='text-2xl'>{totalUsers}</p>
                    </div>
                        <HiOutlineUserGroup className='bg-sky-600 dark:bg-sky-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthUsers}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-[#23272a] gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                        <p className='text-2xl'>{totalComments}</p>
                    </div>
                        <HiAnnotation className='bg-green-600 dark:bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>
            <div className='flex flex-col p-3 dark:bg-[#23272a] gap-4 md:w-72 w-full rounded-md shadow-md'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                        <p className='text-2xl'>{totalPosts}</p>
                    </div>
                        <HiDocumentText className='bg-teal-600 dark:bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthPosts}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                </div>
            </div>
        </div> 
        <div className='flex-wrap flex gap-4 py-3 mx-auto justify-center xl:max-w-5xl overflow-hidden'>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#23272a]'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent users</h1>
                    <Link to={'/dashboard?tab=users'}>
                        <button type='button' class="relative inline-flex items-center justify-center p-4 px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-2 hover:ring-purple-500">
                            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span class="absolute transparent-bg inset-0 w-full h-full group-hover:dark:bg-[#2c2f33] group-hover:bg-white"></span>
                            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 group-hover:bg-transparent ease"></span>
                            <span class="relative text-white group-hover:text-purple-500">See all</span>
                        </button>
                    </Link>
                </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:bg-transparent bg-gray-100">
                        <thead class="text-[11.5px] uppercase text-slate-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    User Image
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Username
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                        {users.map((currElem, idx)=>{
                        return(
                           
                            <tr key={currElem._id} class="odd:dark:bg-[#23272a] bg-white even:dark:bg-[#2c2f33] border-b dark:border-gray-700">
                                <td class="px-6 py-4">
                                    <Link to={`/post/${currElem.slug}`}>
                                    <img src={currElem.photoUrl} alt="user" className='w-10 h-10 object-cover bg-gray-500 rounded-full' />
                                    </Link>
                                </td>
                                <td class="px-6 py-4">
                                <Link className='font-medium dark:text-gray-400 text-black' to={`/post/${currElem.slug}`}>
                                    {currElem.username.length < 15 ? currElem.username : currElem.username.slice(0,15) + "..."}
                                </Link>
                                </td>
                            </tr>
                           
                        )
                        })   
                        }
                        </tbody>
                    </table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#23272a]'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent comments</h1>
                    <Link to={'/dashboard?tab=comments'}>
                        <button type='button' class="relative inline-flex items-center justify-center p-4 px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-2 hover:ring-purple-500">
                            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span class="absolute transparent-bg inset-0 w-full h-full group-hover:dark:bg-[#2c2f33] group-hover:bg-white"></span>
                            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 group-hover:bg-transparent ease"></span>
                            <span class="relative text-white group-hover:text-purple-500">See all</span>
                        </button>
                    </Link>
                </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-[11.5px] uppercase text-slate-700 dark:text-gray-400 dark:bg-transparent bg-gray-100">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Comment content
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Likes
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                        {comments.map((currElem, idx)=>{
                        return(
                           
                            <tr key={currElem._id} class=" odd:dark:bg-[#23272a] bg-white even:dark:bg-[#2c2f33] border-b dark:border-gray-700">
                                <td class="px-6 py-4 w-96">
                                    <p className='line-clamp-2'>{currElem.content}</p>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    {currElem.numberOfLikes}
                                </td>
                            </tr>
                           
                        )
                        })   
                        }
                        </tbody>
                    </table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#23272a]'>
                <div className='flex justify-between p-3 text-sm font-semibold items-center'>
                    <h1 className='text-center p-2'>Recent posts</h1>
                    <Link to={'/dashboard?tab=posts'}>
                        <button type='button' class="relative inline-flex items-center justify-center p-4 px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-2 hover:ring-purple-500">
                            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span class="absolute transparent-bg inset-0 w-full h-full group-hover:dark:bg-[#2c2f33] group-hover:bg-white"></span>
                            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 group-hover:bg-transparent ease"></span>
                            <span class="relative text-white group-hover:text-purple-500">See all</span>
                        </button>
                    </Link>
                </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <thead class="text-[11.5px] uppercase text-slate-700 dark:text-gray-400 dark:bg-transparent bg-gray-100">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Post image
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Post title
                                </th>
                                <th scope="col" class="pr-3 py-3 ">
                                    Post category
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                        {posts.map((currElem, idx)=>{
                        return(
                            
                            <tr key={currElem._id} class=" odd:dark:bg-[#23272a] bg-white even:dark:bg-[#2c2f33] border-b dark:border-gray-700">
                                <td class="px-6 py-4">
                                    <Link to={`/post/${currElem.slug}`}>
                                    <img src={currElem.image} alt="user" className='w-14 h-10 object-cover bg-gray-500 rounded-md' />
                                    </Link>
                                </td>
                                <td class="px-6 py-4 w-80">
                                <Link className='font-medium dark:text-gray-400 text-black' to={`/post/${currElem.slug}`}>
                                    {currElem.title}
                                </Link>
                                </td>
                                <td class="py-4 pr-3 w-5">
                                <Link className='font-medium dark:text-gray-400 text-black' to={`/post/${currElem.slug}`}>
                                    {currElem.category}
                                </Link>
                                </td>
                            </tr>
                            
                        )
                        })   
                        }
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}

export default DashboardComp
