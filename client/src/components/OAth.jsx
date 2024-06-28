import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAth() {
    const dispatch = useDispatch();
    const handleGoogleOAth = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const navigate = useNavigate()

            const result = await signInWithPopup(auth, provider)

          //console.log(result);
          const res = await fetch('/api/auth/google',
            {
                method: 'POSt',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName, email: result.user.email, photo: result.user.photoURL
                }),
            }
          )
          const data = await res.json()
          dispatch(signinSuccess(data));
          navigate('/')
        } catch (error) {
            console.log("couldn't signin with google", error);
        }
    }
  return (
    <button type='button' onClick={handleGoogleOAth} className='bg-red-600 text-white p-3 rounded-lg  hover:opacity-95 disabled:opacity-80'>CONTINUE WITH GOOGLE</button>
  )
}
