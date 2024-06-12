import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, redirect, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";

const AddBed = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const { room } = useParams();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Tambah Kasur?",
      text: "Apakah anda yakin ingin menambah kasur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tambah!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${baseURL}/api/bed/add`,
            {
              room: room,
              bed: data.name,
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
              "Data kasur berhasil ditambahkan.",
              "success"
            ).then(() => {
              window.location.href = `/rooms/admin/${room}`;
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
              TokenExpired();
            }
            Swal.fire("Gagal!", "Kasur gagal ditambahkan.", "error").then(
              () => {
                window.location.reload();
              }
            );
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
              <h3>Tambah Kasur</h3>
              <span>Kamar {room}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card text-start py-4 px-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama"
                  aria-label="Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  required
                />
              </div>
            </div>

            <div className="row justify-content-center mt-5 gap-2">
              <NavLink
                to={`/rooms/admin/${room}`}
                className="btn btn-outline-danger col-md-3"
              >
                Batal
              </NavLink>
              <button type="submit" className="btn btn-primary col-md-3">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default AddBed;
