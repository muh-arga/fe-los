import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, redirect, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";

const EditUser = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Update Data User?",
      text: "Apakah anda yakin ingin mengedit data user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${baseURL}/api/users/update/${id}`,
            {
              name: data.name,
              nip: data.nip,
              gender: data.gender ?? "Laki-Laki",
              address: data.address,
              phone: data.phone,
              role: data.role,
              password: data.password,
              confirmPassword: data.confirmPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire(
              "Berhasil!",
              "Data user berhasil diedit.",
              "success"
            ).then(() => {
              window.location.href = `/admin`;
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
              TokenExpired();
            }
            Swal.fire("Gagal!", "Data user gagal diedit.", "error").then(() => {
              window.location.reload();
            });
          });
      }
    });
  };

  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Edit Data User</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        {!loading ? (
          <div className="card text-start py-4 px-5">
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Nama User</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Pasien"
                    aria-label="Name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Alamat</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    aria-label="Address"
                    name="address"
                    onChange={handleChange}
                    value={data.address}
                    required
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">NIP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NIP"
                    aria-label="NIP"
                    name="nip"
                    onChange={handleChange}
                    value={data.nip}
                    required
                  />
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Nomor HP</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Phone"
                    name="phone"
                    onChange={handleChange}
                    value={data.phone}
                    required
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    name="gender"
                    className="form-select"
                    onChange={handleChange}
                    value={data.gender}
                    required
                  >
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Password Baru</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password Baru"
                    aria-label="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    className="form-select"
                    onChange={handleChange}
                    value={data.role}
                    required
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Konfirmasi Password Baru</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Konfirmasi Password Baru"
                    aria-label="Confirm_Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={data.confirmPassword}
                  />
                </div>
              </div>

              <div className="row justify-content-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary col-md-4 col-6"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </AppLayout>
  );
};

export default EditUser;
