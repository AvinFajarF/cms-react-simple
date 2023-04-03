import axios from 'axios'
import React, { useEffect } from 'react'

function Profile() {

    const token = localStorage.getItem("Authorization")

    useEffect(() => {
     
        axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
          axios.get("http://localhost:8000/api/v1/user/show",{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }).then(res => {
            console.log(res);
          })
        })

    }, [])
    



  return (
    <div>Profile</div>
  )
}


export default Profile