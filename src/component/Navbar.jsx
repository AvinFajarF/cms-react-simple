import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {

  const [isAdmin, setIsAdmin] = useState()
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .get("http://localhost:8000/api/v1/user/show", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
        setIsAdmin(res.data.data.role);
        });
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Blog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                <i class="bi bi-house"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/posts">
                <i class="bi bi-file-post"></i>
              Post
                </a>
              </li>

              {token ? 
              <li className="nav-item">
              <a href="/profile"  className="nav-link"><i class="bi bi-person"></i>Profile</a>
              </li>:
             <li className="nav-item px-4">
             <a href="/login"  className="btn btn-outline-info fw-bold text-dark mt-2"><i class="bi bi-box-arrow-in-right"></i> Login</a>
             </li>
            }

              
              {isAdmin   === "superadmin" || isAdmin === "admin" ? 
              <li className="nav-item">
              <a href="/posts/data"  className="btn btn-outline-info fw-bold text-dark mt-2"><i class="bi bi-folder"></i> Dashboard</a>
              </li>:
              ""
            }
            
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
