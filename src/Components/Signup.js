import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const otpRef = useRef(null);
  const host = "https://keepnotes-wfzj.onrender.com";
  const navigate = useNavigate();
  const [buffer, setbuffer] = useState(false);
  const [userdata, setuserdata] = useState(null);

  const handleotp = async (e) => {
    e.preventDefault();
    const data = {
      userId: userdata.data.userId,
      otp: otpRef.current.value,
    };

    const response = await fetch(`${host}/api/auth/verifyOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.status == "VERIFIED") {
      navigate("/");
    } else {
      console.log(json);
      alert("incorrect otp");
    }
  };
  const handlesignup = async (e) => {
    setbuffer(true);
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // api_call _marna
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json.token);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      console.log(json);
      // navigate("/verify");
      // setverify(true);
      setuserdata(json);
    } else {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      nameRef.current.value = "";
      alert("invalid email or password");
    }
    setbuffer(false);
  };

  return (
    <>
      {buffer && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {!userdata ? (
        <div className="container my-5">
          <form onSubmit={handlesignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                ref={nameRef}
              />
            </div>
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
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              signup
            </button>
          </form>
          <p className="my-3">
            Already have an account!! <a href="/login"> Login Now</a>
          </p>
        </div>
      ) : (
        <div className="container">
          <h4 className="my-3">
            OTP sent to your email {userdata.data.email}{" "}
          </h4>
          <form onSubmit={handleotp}>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                OTP
              </label>
              <input
                type="otp"
                className="form-control"
                id="otp"
                ref={otpRef}
              />
              <button type="submit" className="btn btn-primary my-3">
                verify Otp
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
