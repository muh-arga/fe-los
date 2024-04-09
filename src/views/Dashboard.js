import React, { useRef, useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";

$.DataTable = require("datatables.net-bs5");

const Dashboard = () => {
  const tableRef = useRef();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });

    const table = $(tableRef.current).DataTable({
      columnDefs: [{
        "defaultContent": "-",
        "targets": "_all"
      }],
      // "dom": '<"header-wrapper row justify-content-between align-items-center mb-4"<"col-6" f> <"col-6 row" l>>rt<"footer-wrapper"p>',
      responsive: true,
    });
    return () => table.destroy();
  }, []);

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
              {!loading ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.nik}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="d-flex justify-content-center px-4">
                      <NavLink
                        to="/history"
                        className="btn btn-sm fw-medium btn-primary text-light me-2 col-4"
                      >
                        LOS
                      </NavLink>
                      <NavLink
                        to={`/add-patient/${item.id}`}
                        className="btn btn-sm fw-medium btn-warning text-light me-2 col-4"
                      >
                        Edit
                      </NavLink>
                      <a
                        href="#"
                        className="btn btn-sm fw-medium btn-danger text-light col-4"
                      >
                        Hapus
                      </a>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colspan="6">Loading</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
