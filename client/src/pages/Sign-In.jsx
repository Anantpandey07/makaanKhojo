import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signinStart, signinFailure, signinSuccess } from '../redux/user/userSlice';
import OAth from '../components/OAth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const{loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (eve) =>{
    setFormData({
      ...formData,
      [eve.target.id] : eve.target.value
    });
  };

  const handleSubmit = async(eve) =>{
    eve.preventDefault();  // to avoid loading on submit
    try {
    dispatch(signinStart());
    const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    //console.log(data);
    
    if(data.success == false){
      dispatch(signinFailure(data.message));
      return;
    }
    dispatch(signinSuccess(data)); 
    navigate('/');

    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  }

  //console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-4 font-semibold'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit = {handleSubmit} >
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}></input>
        <button disabled = {loading} className='bg-slate-800 text-white p-3 rounded-lg my-2 hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'SIGN IN'}</button>
        <OAth/>
      </form>
      <div className='flex gap-2 mt-6'>
        <p>Don't have an account ?</p>
        <Link to = {"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}
