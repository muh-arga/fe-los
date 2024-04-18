import React, { useRef, useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../components/TokenExpired";

$.DataTable = require("datatables.net-bs5");

const Dashboard = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/patients`, {
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

  useEffect(() => {
    if (!loading) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        destroy: true,
      });

      return () => {
        table.destroy(); // Destroy the DataTable instance before unmounting
      };
    }
  }, [loading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Pasien?",
      text: "Apakah anda yakin ingin menghapus pasien ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseURL}/api/patients/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            Swal.fire("Berhasil!", "Pasien berhasil dihapus.", "success").then(
              () => {
                window.location.reload();
              }
            );
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Gagal!", "Pasien gagal dihapus.", "error").then(() => {
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
              <h3>Daftar Pasien</h3>
              <div className="d-flex flex-column pe-5">
                <p className="text-subtitle text-muted d-flex justify-content-between col-4">
                  Total Pasien{" "}
                  <span
                    className="badge bg-success-light"
                    style={{ width: "fit-content" }}
                  >
                    {data ? data.length : 0}
                  </span>
                </p>
                <div className="d-flex col-4">
                  <NavLink to="/add-patient" className="btn btn-success col-12">
                    <i className="bi bi-plus me-2 text-light"></i>Tambah
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div id="patient-data">
          <table
            className="table table-bordered table-hover display table-sx w-100"
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>NIK</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td className="text-start">{item.nik}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="d-flex justify-content-center px-4">
                      <NavLink
                        to={`/history/${item.id}`}
                        className="btn btn-sm fw-medium btn-primary text-light me-2 col-4"
                      >
                        <i className="bi bi-eye-fill me-2 text-light"></i>
                        LOS
                      </NavLink>
                      <NavLink
                        to={`/edit-patient/${item.id}`}
                        className="btn btn-sm fw-medium btn-warning text-light me-2 col-4"
                      >
                        <i className="bi bi-pencil-fill me-2 text-light"></i>
                        Edit
                      </NavLink>
                      <button
                        type="button"
                        className="btn btn-sm fw-medium btn-danger text-light col-4"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash-fill me-2 text-light"></i>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
