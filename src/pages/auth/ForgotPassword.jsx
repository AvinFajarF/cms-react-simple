import axios from 'axios'
import React, { useState } from 'react'

// toastify
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {

    const [email, setEmail] = useState()
    const [token, setToken] = useState()
    const [password, setPassword] = useState()

    const typingEmail = (event) => {
    setEmail(event.target.value);
    }

    const typingToken = (event) => {
    setToken(event.target.value);
    }

    const typingPassword = (event) => {
    setPassword(event.target.value);
    }

    const handleForgotPassword = async () => {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie").then(async () => {

        await axios.post("http://localhost:8000/api/v1/reset-password", {
            token: token,
            email: email,
            password: password,
            password_confirmation: password
        }).then(res => {
            toast.success("Berhasil melakukan reset password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }).catch(() => {
            toast.error("Error pada saat reset password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        })

        })


    }


  return (
   <>
     <ToastContainer />
   <div className="container" border="primay">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card">
              <div className="card-header bg-success text-white">Reset Passowrd</div>
              <div className="card-body">
                <form>
                <div className="form-group mb-2">
                    <label htmlFor="token">Token :</label>
                    <input
                      type="text"
                      onChange={typingToken}
                      className="form-control"
                      id="token"
                      placeholder="token"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      onChange={typingEmail}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">New Password :</label>
                    <input
                      type="password"
                      onChange={typingPassword}
                      className="form-control"
                      id="password"
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

   </>

  )
}


export default ForgotPassword