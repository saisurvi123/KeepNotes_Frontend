import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const host = "https://keepnotes-wfzj.onrender.com";

  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // api_call _marna
    const response = await fetch(`${host}/api/auth/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!json.error) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      alert("invalid credentials");
      console.log(json);
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handlelogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="my-3">Dont have an account!!  <a href="/signup"> Signup Now</a></p>
    </div>
  );
}

export default Login;
