import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({post}) {
  return (
    <div className='group w-full relative overflow-hidden mt-8 border sm:w-[430px] h-[366px] shadow-2xl dark:border-gray-600 hover:border-2 rounded-md transition-all mx-2'>
        <a href={`/post/${post.slug}`}>
            <img src={post.image} alt='post cover' className='h-[260px] border-b rounded-md w-full object-cover group-hover:h-[200px] group-hover:min-w-full transition-all duration-300 z-20' />
        </a>
        <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <a href={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 dark:hover:bg-gray-600 hover:bg-sky-600 border border-sky-600 text-sky-600 dark:border-gray-600 dark:text-gray-200 dark:hover:text-white hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
                Read more
            </a>
        </div>
    </div>
  )
}

export default PostCard
