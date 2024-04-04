import React from 'react';
import logo from '../assets/logo.jpg'

const Footer = () => {
  return (
    <footer class="bg-gray-100 dark:bg-[#23272a]">
    <div class="container px-6 py-8 mx-auto">
        <div class="flex flex-col items-center text-center">
            <a href="/home">
                <img class="w-24 h-24 rounded-full" src={logo} alt="" />
            </a>

            <p class="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">iKeep is an elegant and feature-rich blogging platform under active development.</p>

            <div class="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
                <a href='https://github.com/priyanshugarg19' class="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide text-gray-600 capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 dark:border-gray-400 dark:text-gray-300 sm:mt-0 sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring dark:hover:bg-gray-800 focus:ring-gray-300 focus:ring-opacity-40">
                    <span class="mx-1">Check our GitHub</span>
                </a>

                <button class="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Contact Us</button>
            </div>
        </div>

        <hr class="my-10 border-gray-200 dark:border-gray-700" />

        <div class="flex flex-col items-center sm:flex-row justify-center">
            <p class="text-sm text-gray-500 just">© Copyright 2024. All Rights Reserved.</p>
        </div>
    </div>
</footer>
  )
}

export default Footer
