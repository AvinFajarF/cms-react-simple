import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef} from "react";
import { useNavigate } from 'react-router-dom';
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const navigate = useNavigate()

  const handleLogin = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    await axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      // login
      axios.post("http://127.0.0.1:8000/api/v1/login", {  
      email: email,
      password: password
      }, {
        withCredentials: true
      }).then((res) => {
        let token = res.data.token;
        Cookies.set("Authorization", token);

        if(res.data.status === 'success'){
          localStorage.setItem("Authorization", token)
          localStorage.setItem("auth_name", res.data.name)

          navigate("/")
        }
        


      });
    });
  };

  return (
    <>
      <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" classNamel="form-label">Email address</label>
    <input type="email" classNamel="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" classNamel="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div classNamel="mb-3">
    <label for="exampleInputPassword1" classNamel="form-label">Password</label>
    <input type="password" classNamel="form-control" id="exampleInputPassword1" />
  </div>
  <div classNamel="mb-3 form-check">
    <input type="checkbox" classNamel="form-check-input" id="exampleCheck1" />
    <label classNamel="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" classNamel="btn btn-primary">Submit</button>
</form>
    </>
  );
}

export default Login;
