import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink, redirect } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";
import TokenExpired from "../components/TokenExpired";
import Swal from "sweetalert2";

const AddPatient = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseURL}/api/patients`,
        {
          name: data.name,
          nik: data.nik,
          gender: data.gender ?? "Laki-Laki",
          birthPlace: data.birth_place,
          birthDate: data.birth_date,
          address: data.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data pasien berhasil ditambahkan",
        }).then(() => {
          window.location.href = `/predict/${res.data.data.id}`;
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
      });
  };

  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Tambah Data Pasien</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card text-start py-4 px-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Nama Pasien</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Pasien"
                  aria-label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Tempat Lahir</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tempat Lahir"
                  aria-label="Birth_Place"
                  name="birth_place"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">NIK</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NIK"
                  aria-label="NIK"
                  name="nik"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  className="form-control"
                  aria-label="Birth_Date"
                  name="birth_date"
                  onChange={handleChange}
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
                  required
                >
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Alamat</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Alamat"
                  aria-label="Tempat_Lahir"
                  name="address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              <button type="submit" className="btn btn-primary col-md-4 col-6">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default AddPatient;
