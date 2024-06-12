import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../routes/Config";
import LoginError from "../../components/LoginError";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

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
      .post(`${baseURL}/api/auth/register`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil melakukan registrasi",
          text: "Harap tunggu hingga admin mengkonfirmasi akun anda!",
        }).then(() => {
          window.location.href = "/login";
        });
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
        <div className="col-6 py-4 px-5 text-start">
          <div className="d-flex align-items-center text-decoration-none text-dark">
            <img
              src="assets/img/logo.png"
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
            <h5 className="fw-bold ms-2">LosPrediction</h5>
          </div>

          <div className="header mt-4">
            <h3 className="fw-bold">Daftar</h3>
          </div>

          <div className="form">
            <form className="mt-4" onSubmit={handleSubmit}>
              {error ? <LoginError message={error} /> : ""}
              <div className="row justify-content-center">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label fw-medium">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Lengkap"
                      aria-label="Name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-label fw-medium">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      name="email"
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label fw-medium">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ex: 081234567890"
                      aria-label="Phone"
                      name="phone"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label fw-medium">NIP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NIP"
                      aria-label="Nip"
                      name="nip"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-label fw-medium">Alamat</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alamat"
                      aria-label="Address"
                      name="address"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-label fw-medium">
                      Jenis Kelamin
                    </label>
                    <select
                      className="form-select"
                      name="gender"
                      value={data.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Register
                </button>
                <p className="mt-2">
                  Sudah punya akun?{" "}
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    Masuk
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="col-6 position-relative">
          <div id="hero"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
