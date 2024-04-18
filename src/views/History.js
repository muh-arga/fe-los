import React, { useRef, useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";
import moment from "moment";
import Swal from "sweetalert2";
import { act } from "react-dom/test-utils";
import TokenExpired from "../components/TokenExpired";

$.DataTable = require("datatables.net-bs5");

const History = () => {
  const tableRef = useRef();
  const { id } = useParams();

  const [data, setData] = useState({ los: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
        setLoading(true);
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

  const handleOut = (id, startDate) => {
    Swal.fire({
      title: "Selesai?",
      text: "Apakah anda yakin ingin menyelesaikan rawat inap pasien?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Selsai!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${baseURL}/api/los/update/${id}`,
            {
              status: 1,
              actual: moment().diff(startDate, "days") + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            Swal.fire("Berhasil!", "Data berhasil diupdate.", "success").then(
              () => {
                window.location.reload();
              }
            );
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Gagal!", "Data gagal diupdate.", "error").then(() => {
              window.location.reload();
            });
          });
      }
    });
  };

  return (
    <AppLayout>
      <div className="page-heading mb-0">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start mb-4">
              <h3>Riwayat Pasien</h3>
              <p className="text-subtitle text-muted d-flex justify-content-between col-4">
                {data.name}
              </p>
              <div className="d-flex col-4">
                <NavLink
                  to={`/predict/${id}`}
                  className="btn btn-success col-12"
                >
                  <i className="bi bi-plus me-4 text-light"></i>Tambah
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
                <th>Tanggal</th>
                <th>Ruangan</th>
                <th>Tempat Tidur</th>
                <th>Predict LOS</th>
                <th>Actual LOS</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.los.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                  <td>{item.bed.room}</td>
                  <td>{item.bed.bed}</td>
                  <td>{item.estimate}</td>
                  <td>{item.actual ?? "-"}</td>
                  <td>
                    {item.status ? (
                      <div>
                        <span className="badge bg-danger">Out</span>
                      </div>
                    ) : (
                      <div>
                        <span className="badge bg-success">In</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center px-4">
                      <NavLink
                        to={`/detail-los/${item.id}`}
                        className="btn btn-sm fw-medium btn-primary text-light me-2"
                      >
                        Detail
                      </NavLink>
                      {!item.status ? (
                        <button
                          className="btn btn-sm fw-medium btn-danger text-light"
                          onClick={() => handleOut(item.id, item.startDate)}
                        >
                          Out
                        </button>
                      ) : (
                        <div></div>
                      )}
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

export default History;
