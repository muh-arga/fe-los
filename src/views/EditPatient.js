import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink, redirect, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../components/TokenExpired";

const EditPatient = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/patients/${id}`, {
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
        if(err.response.status === 401) {
          TokenExpired()
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
      title: "Update Data Pasien?",
      text: "Apakah anda yakin ingin mengedit data pasien?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${baseURL}/api/patients/update/${id}`,
            {
              name: data.name,
              nik: data.nik,
              gender: data.gender ?? "Laki-Laki",
              birthPlace: data.birthPlace,
              birthDate: data.birthDate,
              address: data.address,
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
              "Data pasien berhasil diedit.",
              "success"
            ).then(() => {
              window.location.href = `/`;
            });
          })
          .catch((err) => {
            console.log(err);
            if(err.response.status === 401) {
              window.location.reload();
            }
            Swal.fire("Gagal!", "Data pasien gagal diedit.", "error").then(
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
              <h3>Tambah Data Pasien</h3>
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
                  <label className="form-label">Nama Pasien</label>
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
                  <label className="form-label">Tempat Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tempat Lahir"
                    aria-label="Birth_Place"
                    name="birthPlace"
                    onChange={handleChange}
                    value={data.birthPlace}
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
                    value={data.nik}
                    required
                  />
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="form-label">Tanggal Lahir</label>
                  <input
                    type="date"
                    className="form-control"
                    aria-label="Birth_Date"
                    name="birthDate"
                    onChange={handleChange}
                    value={data.birthDate}
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
                  <label className="form-label">Alamat</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    aria-label="Tempat_Lahir"
                    name="address"
                    onChange={handleChange}
                    value={data.address}
                    required
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

export default EditPatient;
