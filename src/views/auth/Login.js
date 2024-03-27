import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
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
            <p className="fw-medium">Masukkan email dan password untuk login!</p>
          </div>

          <div className="form">
            <form className="mt-5">
              <div className="form-group">
                <label className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
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
                />
              </div>

              <div className="form-group mt-3">
                <NavLink
                  to="/"
                  type="button"
                  className="btn btn-primary w-100 fw-bold"
                >
                  Login
                </NavLink>
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
