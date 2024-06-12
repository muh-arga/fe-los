import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, redirect, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";

const EditBed = () => {
  const [bed, setBed] = useState({});
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/beds/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBed(res.data.data);
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
      title: "Update Data Kasur?",
      text: "Apakah anda yakin ingin mengedit data kasur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${baseURL}/api/bed/update/${id}`,
            {
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
              "Data kasur berhasil diedit.",
              "success"
            ).then(() => {
              window.location.href = `/rooms/admin/${bed.room}`;
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
              window.location.reload();
            }
            Swal.fire("Gagal!", "Data kasur gagal diedit.", "error").then(
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
              <h3>Edit Data Kasur {bed.bed}</h3>
              <span>Kamar {bed.room}</span>
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
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Pasien"
                    aria-label="Name"
                    name="name"
                    onChange={handleChange}
                    value={data.name ?? bed.bed}
                    required
                  />
                </div>
              </div>

              <div className="row justify-content-center mt-5 gap-2">
                <NavLink
                  to={`/rooms/admin/${bed.room}`}
                  className="btn btn-outline-danger col-md-3"
                >
                  Batal
                </NavLink>
                <button
                  type="submit"
                  className="btn btn-primary col-md-3"
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

export default EditBed;
