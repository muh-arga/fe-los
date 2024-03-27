import React, { useRef, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink } from "react-router-dom";

$.DataTable = require("datatables.net-bs5");

const History = () => {
  const tableRef = useRef();

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      // "dom": '<"header-wrapper row justify-content-between align-items-center mb-4"<"col-6" f> <"col-6 row" l>>rt<"footer-wrapper"p>',
      responsive: true,
    });
    return () => table.destroy();
  }, []);

  return (
    <AppLayout>
      <div className="page-heading mb-0">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start mb-4">
              <h3>Riwayat Pasien</h3>
              <p className="text-subtitle text-muted d-flex justify-content-between col-4">
                  John Doe
                </p>
                <div className="d-flex col-4">
                  <NavLink to="/predict" className="btn btn-success col-12">
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
                <th>LOS</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>12-09-2002</td>
                <td>R4</td>
                <td>3</td>
                <td>2 Hari</td>
               <td>
                  <div className="d-flex justify-content-center px-4">
                    <NavLink
                      to="/detail-los"
                      className="btn btn-sm fw-medium btn-primary text-light me-2 col-4"
                    >
                      Detail
                    </NavLink>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>04-02-2001</td>
                <td>R4</td>
                <td>2</td>
                <td>4 Hari</td>
               <td>
                  <div className="d-flex justify-content-center px-4">
                    <NavLink
                      to="/detail-los"
                      className="btn btn-sm fw-medium btn-primary text-light me-2 col-4"
                    >
                      Detail
                    </NavLink>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>12-12-2003</td>
                <td>R1</td>
                <td>2</td>
                <td>5 Hari</td>
                <td>
                  <div className="d-flex justify-content-center px-4">
                    <NavLink
                      to="/detail-los"
                      className="btn btn-sm fw-medium btn-primary text-light me-2 col-4"
                    >
                      Detail
                    </NavLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
};

export default History;
