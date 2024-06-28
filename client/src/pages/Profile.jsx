import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase'

// allow read;
// allow write: if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user)

  const [file, setFile] = useState(undefined);
  const[filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
   //console.log(filePerc)
   //console.log(formData)
  useEffect(() =>{
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePerc(Math.round(progress));
      },
      (error) =>{
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setFormData({...formData, avatar: getDownloadURL});
        })
      }
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-8'>Profile</h1>
      <form className='flex flex-col gap-3'>
      <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/.*'></input>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'></img>
        <p className='text-sm self-center'>
          {
            fileUploadErr ? 
            (<span className='text-red-600'>Error occurred (Image must be less than 2 MB)</span>) :
            filePerc > 0 && filePerc < 100 ? (
            <span className='text-green-600'>{`Uploading ${filePerc}`}</span>  
            ) : 
            filePerc === 100 ? (
              <span className='text-green-700'>Image Uploaded</span>
            ) : (
              ''
            )
          }
        </p>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>

        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>

        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password'/>

        <button className='border p-3 rounded-lg bg-blue-600 text-white hover: opacity-95 disabled:opacity-75'>UPDATE</button>
      </form>
      <div className='flex justify-between p-2 mt-4'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
