import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useLocation , useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard"
export default function Search() {
    
    const [sidebarData, setSidebarData]= useState({
        searchParams: '',
        category: '',
        sortDirection: 'desc'
    })
    const [posts, setPosts]= useState([]);
    const [loading, setLoading]= useState(false);
    const [showMore, setShowMore]= useState(false);
    
    const navigate= useNavigate();
    const location = useLocation();
    
    
    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search);
        const searchParamsFromUrl= urlParams.get("searchParams");
        const searchCategoryFromUrl= urlParams.get("category");
        const searchSortFromUrl= urlParams.get("sortDirection");
        if (searchParamsFromUrl || searchCategoryFromUrl || searchSortFromUrl){
          setSidebarData({
            ...sidebarData,
            searchParams: searchParamsFromUrl,
            category: searchCategoryFromUrl,
            sortDirection: searchSortFromUrl
          })
        }
        const fetchPost=async()=>{
            setLoading(true);
            const searchQuery= urlParams.toString();
            const res=await fetch(`/api/post/getposts?${searchQuery}`);
            if(!res.ok){
                setLoading(false);
                return;
            }
            if(res.ok){
                const data=await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length>9){
                    setShowMore(true);
                }
            }
        }
        fetchPost();
      },[location.search]);

      const handleChange=(e)=>{
        if(e.target.id == 'searchParams'){
            setSidebarData({...sidebarData, searchParams: e.target.value });
        }
        if(e.target.id == 'category'){
        
            const category = e.target.value;
            setSidebarData({...sidebarData, category});
           
        }
        if(e.target.id == 'sort'){
            const sorted= e.target.value || 'desc';
            setSidebarData({...sidebarData, sortDirection: sorted });
        
        }
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams= new URLSearchParams(location.search);
        urlParams.set('searchParams', sidebarData.searchParams );
        urlParams.set('category', sidebarData.category);
        urlParams.set('sortDirection', sidebarData.sortDirection );
        const searchQuery= urlParams.toString();
        console.log(sidebarData);
        navigate(`/search?${searchQuery}`);

      }
    return (
        <>
            <Header />
            <div className="pt-16 flex lg:flex-row flex-col h-full">
                <form onSubmit={handleSubmit}>
                    <div class=" px-2 py-2 lg:h-[93.5%] w-full lg:w-72 lg:fixed">
                        <div class="rounded-xl border border-gray-200 dark:border-none h-full dark:bg-[rgb(35,39,42)] bg-white p-6 shadow-lg ">
                            <h2 class="text-stone-700 dark:text-gray-200 text-xl font-bold">Apply filters</h2>
                            <p class="mt-1 text-sm">Use filters to further refine search</p>
                            <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 ">
                                <div class="flex flex-col">

                                    <label for="name" class="text-stone-600 dark:text-gray-200 text-sm font-medium">
                                    Search Term
                                    </label>
                                    <input
                                        value={sidebarData.searchParams} 
                                        onChange={handleChange}
                                        type="text"
                                        id="searchParams"
                                        class="mt-2 block w-full rounded-md border text-slate-800 border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label  class="text-stone-600 dark:text-gray-200 text-sm font-medium">
                                        Category
                                    </label>

                                    <select
                                        value={sidebarData.category}
                                        onChange={handleChange}
                                        id="category"
                                        class="mt-2 block w-full text-slate-800 rounded-md border border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    >
                                        <option disabled selected hidden>Select a category...</option>
                                        <option value=''>All</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Education">Education</option>
                                        <option value="Others">Others</option>
                                        
                                        
                                    </select>
                                </div>

                                <div class="flex flex-col">
                                    <label  class="text-stone-600 dark:text-gray-200 text-sm font-medium">
                                        Sort by
                                    </label>

                                    <select
                                        onChange={handleChange}
                                        value={sidebarData.sortDirection}
                                        id="sort"
                                        class="mt-2 block w-full rounded-md border text-slate-800 border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    >
                                        <option value='desc'>Recent</option>
                                        <option value='asc'>Former</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mt-6  w-full ">
                                <button type="submit" class="active:scale-95 rounded-lg w-full md:w-28  bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="lg:ml-72 text-white flex-1 overflow-x-hidden pb-5 ">
                   
                    <div className='flex flex-wrap gap-5 text-black dark:text-gray-200 justify-center'>
                    {!loading && posts && posts.map((post)=>(
                        <PostCard key={post._id} post={post} />
                    ))}
                    </div>
           
                   {!loading && posts.length===0 &&(
                        <div className="text-center w-full">
                            <p className="text-xl text-gray-500">
                                No Post Found
                            </p>
                        </div>
                    )
                    }
                    {loading && (
                        <div className="text-center w-full">
                            <p className=" text-xl text-gray-500">
                                Loading...
                            </p>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    );
}
