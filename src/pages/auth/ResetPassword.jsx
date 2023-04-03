import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
// toastify

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ResetPassword() {
  const token = localStorage.getItem("Authorization");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const typingEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {

    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios
          .post(
            "http://localhost:8000/api/v1/forgot-password",
            {
              email: email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            toast.success("Berhasil mengirim link reset-password !", {
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
            toast.error("Gagal mengirim link reset-password !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });

          setTimeout(() => {
            navigate("/forgot-password")
          }, 1000);

      });

      
  };

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
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      onChange={typingEmail}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <br />
                  <button
                    type="button"
                    onClick={handleResetPassword}
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
  );
}

export default ResetPassword;
