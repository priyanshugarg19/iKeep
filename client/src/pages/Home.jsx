import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/header1';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Footer from '../components/footer';
import { AiOutlineSearch } from 'react-icons/ai';
function Home() {
  const divRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams]= useState('');
  const navigate = useNavigate();
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setIsHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const scrollToDiv = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(()=>{
    const fetchPosts = async()=>{
        try {
            const res = await fetch("/api/post/getposts?limit=3");
            const data = await res.json();
            if(res.ok){
                setPosts(data.posts);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const searchParamsFromUrl= urlParams.get("searchParams");
    if (searchParamsFromUrl){
      setSearchParams(searchParamsFromUrl);
    }
  },[location.search]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    try {

      const urlParams= new URLSearchParams(location.search);
      urlParams.set('searchParams', searchParams );
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}&category=&sortDirection=`);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <div className="bg-[url('https://images.unsplash.com/photo-1684487747385-442d674962f2')] overscroll-none bg-cover bg-no-repeat bg-center h-screen relative">
        <div className="bg-black/20 flex justify-center items-center flex-col py-[420px] px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto h-screen">
          <h1 className="pb-4">Search for a blog</h1>
          <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
            <div className="relative z-30 text-base text-black">
              <form onSubmit={handleSubmit}>
                <input type="text" value={searchParams} onChange={(e)=>{setSearchParams(e.target.value)}} placeholder="What's on your mind ?" className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full" />
                <button className='absolute top-4 right-3'>
                  <AiOutlineSearch className='text-[20px] dark:text-gray-500' />
                </button>
              </form>
              <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto">
              </div>
            </div>
          </div>
          <Link className='w-16 absolute bottom-10' onClick={scrollToDiv}>
            <img src='https://assets-v2.lottiefiles.com/a/3ffa9362-1165-11ee-be6e-2bb2b0ace36d/fC7hVY4Sym.gif' />
          </Link>
        </div>
      </div>

      <div ref={divRef} className="relative overflow-hidden pt-2">
        <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
          <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                Created by: Git-rpgs 
              </p>
              <div className="mt-5 max-w-2xl">
                <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                  iKeep: A blogging platform
                </h1>
              </div>
              <div className="mt-5 max-w-3xl">
                <p className="text-lg text-gray-600 dark:text-gray-400">iKeep is an elegant and feature-rich blogging platform under active development. Crafted with the latest web technologies including React, Redux Toolkit, and JWT authentication, iKeep offers a seamless and secure user experience.</p>
              </div>
              <div className="mt-8 gap-3 flex justify-center">
                <Link to='/' className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                  About Us
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </div>
              <div className='flex flex-col justify-center items-center mb-5 mt-12'>
                <h1 className="block font-semibold text-gray-800 text-xl md:text-2xl lg:text-3xl underline-offset-8 underline  dark:text-gray-200">
                  Recent Posts
                </h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center w-screen p-3'>
                    {
                        posts && (
                            posts.map((post)=>{
                              return <PostCard key={post._id} post={post} />
                            })
                        )
                    }
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;