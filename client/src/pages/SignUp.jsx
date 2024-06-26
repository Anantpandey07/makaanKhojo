import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-4 font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'></input>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'></input>
        <button className='bg-slate-800 text-white p-3 rounded-lg my-2 hover:opacity-95 disabled:opacity-80'>SIGN UP</button>
      </form>
      <div className='flex gap-2 mt-6'>
        <p>Have an account? </p>
        <Link to = {"/sign-in"}>
          <span className='text-blue-800'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
