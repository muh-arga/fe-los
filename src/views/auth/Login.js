import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../routes/Config";
import LoginError from "../../components/LoginError";

const Login = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    await axios
      .post(`${baseURL}/api/auth/login`, data)
      .then((res) => {
        const { data } = res;
        sessionStorage.setItem("token", data.accessToken);
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 500) {
          setError("Something went wrong!");
        } else {
          setError(err.response?.data.message || "Something went wrong!");
        }
      });
  };

  return (
    <div>
      <div className="row w-100" style={{ height: "100vh" }}>
        <div className="col-4 py-4 px-5 text-start">
          <div className="d-flex align-items-center text-decoration-none text-dark">
            <img
              src="assets/img/logo.png"
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
            <h5 className="fw-bold ms-2">LosPrediction</h5>
          </div>

          <div className="header mt-4">
            <h3 className="fw-bold">Login</h3>
            <p className="fw-medium">
              Masukkan email dan password untuk login!
            </p>
          </div>

          <div className="form">
            <form className="mt-4">
              {error ? <LoginError message={error} /> : ""}
              <div className="form-group">
                <label className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-3">
                <label className="form-label fw-medium">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-3">
                <button
                  type="button"
                  className="btn btn-primary w-100 fw-bold"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <p className="mt-2">
                  Belum punya akun? <NavLink to="/register" style={{textDecoration: 'none'}}>Buat akun</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="col-8 position-relative">
          <div id="hero"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
