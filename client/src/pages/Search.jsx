import React, { useState } from "react";
import Header from "../components/header";

export default function Sidebar() {
    return (
        <>
            <Header />
            <div className="pt-16 flex lg:flex-row flex-col h-full ">
                <div class=" px-2 lg:h-full w-full lg:w-60 lg:fixed">
                    <div class="rounded-xl border border-gray-200 h-full bg-white p-6 shadow-lg ">
                        <h2 class="text-stone-700 text-xl font-bold">Apply filters</h2>
                        <p class="mt-1 text-sm">Use filters to further refine search</p>
                        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 ">
                            <div class="flex flex-col">
                                <label for="name" class="text-stone-600 text-sm font-medium">
                                   Search Term
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div class="flex flex-col">
                                <label  class="text-stone-600 text-sm font-medium">
                                    Category
                                </label>

                                <select
                                    id="category"
                                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                <label  class="text-stone-600 text-sm font-medium">
                                    Sorted
                                </label>

                                <select
                                    id="sort"
                                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                <div className="lg:ml-60 text-white bg-black flex-1 overflow-x-hidden h-[2000px] ">
                   
                </div>
            </div>
        </>
    );
}
