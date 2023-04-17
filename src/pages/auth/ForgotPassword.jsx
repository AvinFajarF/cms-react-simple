import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const search = useLocation().search;
  const tokenParam = new URLSearchParams(search).get("token");
  const emailParam = new URLSearchParams(search).get("email");


  const typingPassword = (event) => {
    setPassword(event.target.value);
  };

  const typingPasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleForgotPassword = async () => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then(async () => {
        await axios
          .post("http://localhost:8000/api/v1/reset-password", {
            token: tokenParam,
            email: emailParam,
            password: password,
            password_confirmation: passwordConfirmation,
          })
          .then((res) => {
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
          })
          .catch(() => {
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
          });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container" border="primay">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card">
              <div className="card-header bg-success text-white">
                Reset Passowrd
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="token"
                      value={tokenParam}
                      hidden
                      placeholder="token"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="email"
                      className="form-control"
                      value={emailParam}
                      hidden
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Password :</label>
                    <input
                      type="password"
                      onChange={typingPassword}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </div><br />
                  <div className="form-group mb-2">
                    <label htmlFor="cpassword">Confirmation Password :</label>
                    <input
                      type="password"
                      onChange={typingPasswordConfirmation}
                      name="password_confirmation"
                      className="form-control"
                      id="cpassword"
                      placeholder="Password Confirmation"
                      autoComplete="off"
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
  );
}

export default ForgotPassword;
