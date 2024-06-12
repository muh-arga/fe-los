import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, redirect, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";

const AddRoom = () => {
  const [data, setData] = useState({});
  const [bedField, setBedField] = useState([{ id: 1, value: "" }]);
  const token = sessionStorage.getItem("token");

  const handleAddField = () => {
    setBedField([...bedField, { id: bedField.length + 1, value: "" }]);
  };

  const handleDeleteField = (id) => {
    const newBedField = bedField.filter((field) => field.id !== id);
    setBedField(newBedField);
  };

  const handleBedChange = (e, id) => {
    const newBedField = bedField.map((field) => {
      if (field.id === id) {
        field.value = e.target.value;
      }
      return field;
    });
    setBedField(newBedField);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Tambah Kamar?",
      text: "Apakah anda yakin ingin menambah kamar?",
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
              room: data.room,
              bed: bedField.map((field) => field.value),
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
              "Kamar berhasil ditambahkan.",
              "success"
            ).then(() => {
              window.location.href = `/rooms/admin`;
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                TokenExpired();
            }
            Swal.fire("Gagal!", "Kamar gagal ditambahkan.", "error").then(
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
              <h3>Tambah Kamar</h3>
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
                  aria-label="Room"
                  name="room"
                  onChange={handleChange}
                  value={data.room}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Kasur</label>
                {bedField.map((field) => (
                  <div
                    key={field.id}
                    className="mt-2 d-flex flex-row align-items-center"
                  >
                    <input
                      type="text"
                      className="form-control col-10"
                      placeholder="Nama"
                      aria-label="Name"
                      name="name"
                      onChange={(e) => handleBedChange(e, field.id)}
                      value={field.value}
                      required
                    />
                    {field.id > 1 ? (
                      <button
                        type="button"
                        className="btn btn-danger col-2 ms-2"
                        style={{ width: "fit-content" }}
                        onClick={() => handleDeleteField(field.id)}
                      >
                        <i class="bi bi-dash text-light"></i>
                      </button>
                    ) : null}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handleAddField}
                >
                  <i class="bi bi-plus text-light"></i>
                </button>
              </div>
            </div>

            <div className="row justify-content-center mt-5 gap-2">
              <NavLink
                to={`/rooms/admin`}
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

export default AddRoom;
