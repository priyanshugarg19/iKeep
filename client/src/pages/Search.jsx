import React, { useEffect, useState } from "react";
import Header from "../components/header";

export default function Search() {

    const [searchParams, setSearchParams]= useState('');
    const [searchCategory, setSearchCategory]= useState('gaming');
    const [searchSort, setSearchSort]= useState('');

    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search);
        const searchParamsFromUrl= urlParams.get("searchParams");
        const searchCategoryFromUrl= urlParams.get("searchCategory");
        const searchSortFromUrl= urlParams.get("searchSort");
        if (searchParamsFromUrl){
          setSearchParams(searchParamsFromUrl);
        }
        if (searchCategoryFromUrl){
            setSearchCategory(searchCategoryFromUrl);
        }
        if(searchSortFromUrl){
            setSearchSort(searchSortFromUrl);
        }
      },[location.search]);
    return (
        <>
            <Header />
            <div className="pt-16 flex lg:flex-row flex-col h-full">
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
                                    value={searchParams} 
                                    onChange={(e)=>{setSearchParams(e.target.value)}}
                                    type="text"
                                    id="name"
                                    class="mt-2 block w-full rounded-md border text-slate-800 border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div class="flex flex-col">
                                <label  class="text-stone-600 dark:text-gray-200 text-sm font-medium">
                                    Category
                                </label>

                                <select
                                    value={searchCategory}
                                    
                                    id="category"
                                    class="mt-2 block w-full text-slate-800 rounded-md border border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select a category...</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Education">Education</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div class="flex flex-col">
                                <label  class="text-stone-600 dark:text-gray-200 text-sm font-medium">
                                    Sorted
                                </label>

                                <select
                                    id="sort"
                                    class="mt-2 block w-full rounded-md border text-slate-800 border-gray-200 px-2 py-2 lg:py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value='desc'>latest</option>
                                    <option value='asc'>oldest</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-6  w-full   ">
                            <button class="active:scale-95 rounded-lg w-full md:w-28  bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-72 text-white flex-1 overflow-x-hidden h-[2000px] ">
                   
                </div>
            </div>
        </>
    );
}
