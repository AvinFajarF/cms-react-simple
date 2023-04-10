import React from "react";
import { NavLink } from "react-bootstrap";

function App() {
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
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/posts">
              Features
                </a>
              </li>
              <li className="nav-item px-4">
              <NavLink to="/login" type="button" className="btn btn-outline-info fw-bold text-dark"><i class="bi bi-box-arrow-in-right"></i> Login</NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/register" type="button" className="btn btn-outline-info fw-bold text-dark"><i class="bi bi-person-plus"></i> Register</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
