import React, { useState } from 'react'
import axios from 'axios'
import '../components/css/UserRegister.css'

const UserRegister = () => {
  const [file,setFile] = useState()

  const upload = () => {
    
    const formData = new FormData()
    formData.append('file',file)
    axios.post('http://localhost:12312/upload', formData)
    .then(res => {console.log(res)})
    .catch(err=>console.log(err))
  }
  return (
    <div className='user-register-main'>
      UserRegister
      <input type='file' onChange={(e)=> setFile(e.target.files[0])}/>
      <button type='buttopn' onClick={upload}>Upload</button>
    </div>
  )
}

export default UserRegister