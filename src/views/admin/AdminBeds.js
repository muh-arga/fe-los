import React, { useRef, useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";

$.DataTable = require("datatables.net-bs5");

const AdminBeds = () => {
  const { room } = useParams();

  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/beds?room=${room}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
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
      title: "Hapus Kasur?",
      text: "Apakah anda yakin ingin menghapus kasur ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseURL}/api/bed/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            Swal.fire("Berhasil!", "Kasur berhasil dihapus.", "success").then(
              () => {
                window.location.reload();
              }
            );
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
              TokenExpired();
            }
            Swal.fire("Gagal!", "Kasur gagal dihapus.", "error").then(() => {
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
              <div className="d-flex flex-row align-items-center">
                <NavLink
                  to={"/rooms/admin"}
                  className="btn btn-danger py-0 me-2"
                >
                  <i class="bi bi-arrow-left text-light py-0"></i>
                </NavLink>
                <h3>
                  Daftar Kasur - Kamar{" "}
                  <span className="text-primary">{room}</span>
                </h3>
              </div>
              <div className="d-flex flex-column pe-5">
                <p className="text-subtitle text-muted d-flex justify-content-between col-3">
                  Total Kasur{" "}
                  <span
                    className="badge bg-success-light"
                    style={{ width: "fit-content" }}
                  >
                    {data ? data.length : 0}
                  </span>
                </p>
              </div>
              <div className="d-flex col-4">
                <NavLink
                  to={`/rooms/admin/add-bed/${room}`}
                  className="btn btn-success col-12"
                >
                  <i className="bi bi-plus me-2 text-light"></i>Tambah
                </NavLink>
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
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.bed}</td>
                  <td>
                    {item.status === 1 ? (
                      <span className="badge bg-danger">Terisi</span>
                    ) : (
                      <span className="badge bg-success">Tersedia</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center px-4">
                      <NavLink
                        to={`/rooms/admin/beds/${item.id}`}
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

export default AdminBeds;
