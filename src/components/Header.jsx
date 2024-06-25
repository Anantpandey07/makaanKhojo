import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to={'/'}>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Makaan</span>
                <span className='text-slate-700'>Khojo</span>
            </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 text-sm sm:text-l' />
            <FaSearch className='text-slate-600'/>
            <button type='submit' className='text-slate-500 hover:text-slate-700'/>
        </form>

        <ul className='flex gap-4'>
            <Link to={'/'}><li className='text-slate-700 hidden sm:inline hover:underline'>Home</li></Link>
            <Link to={'/About'}><li className='text-slate-700 hidden sm:inline hover:underline'>About</li></Link>
            <Link to={'/sign-in'}><li>Sign In</li></Link>
        </ul>
        </div>
    </header>
  )
}
