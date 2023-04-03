import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// toast

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  // toast

  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    await axios.get("http://localhost:8000/sanctum/csrf-cookie").then( () => {
      // login
      axios
        .post(
          "http://127.0.0.1:8000/api/v1/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          let token = res.data.token;
          // Cookies.set("", token);
          console.log(res.data);
          if (res.data.status === "success") {
            localStorage.setItem("Authorization", token);
            localStorage.setItem("auth_name", res.data.name);
            navigate("/");
          }
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
              <div className="card-header bg-success text-white">Login</div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      ref={inputEmail}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      ref={inputPassword}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div><br />
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <Link to="/reset-password">
      Reset-Password
    </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
