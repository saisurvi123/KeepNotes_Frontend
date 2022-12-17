import React from "react";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import notecontext from "../context/notes/notecontext";

function Navbar() {
  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Keep Notes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item mx-1 my-2">
                <a className="btn btn-primary" href="/login" role="button">
                  Login
                </a>
              </li>
              <li className="nav-item mx-1 my-2">
                <a className="btn btn-primary" href="/signup" role="button">
                  Sign up
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item mx-1">
              <button type="button" className="btn btn-primary" onClick={handlelogout}>logout</button>
              </li>
             
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
