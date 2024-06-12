import React, { useRef, useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../../components/TokenExpired";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

$.DataTable = require("datatables.net-bs5");

const AdminRooms = () => {
  const tableRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
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

  function getColor(percentage) {
    if (percentage <= 25) {
      return "#38CB89";
    } else if (percentage <= 50) {
      return "#FAFF00";
    } else if (percentage <= 75) {
      return "#FF8A00";
    } else {
      return "#FF2E00";
    }
  }

  const cardStyle = {
    flex: "1 1 calc(25% - 20px)",
    margin: "10px",
    textDecoration: "none",
    bacgroundColor: "white",
    maxWidth: "calc(25% - 20px)",
  };

  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Daftar Kamar</h3>
              <div className="d-flex flex-column pe-5">
                <p className="text-subtitle text-muted d-flex justify-content-between col-3">
                  Total Kamar{" "}
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
                  to={`/rooms/admin/add-room`}
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
        <div className="row justify-content-between">
          {data.map((room, index) => (
            <NavLink
              to={`/rooms/admin/${room.room}`}
              className="card"
              style={cardStyle}
              key={index}
            >
              <div class="card-body d-flex flex-row align-items-center">
                <div className="col-6 text-start">
                  <h4 className="card-title fw-bold text-secondary">Kamar</h4>
                  <h1>{room.room}</h1>
                  <span>{room._count.bed} Kasur</span>
                </div>
                <div className="col-6">
                  <CircularProgressbar
                    value={(room._sum.status / room._count.bed) * 100}
                    text={`${Math.floor((room._sum.status / room._count.bed) * 100)}%`}
                    styles={{
                      path: {
                        stroke: getColor(
                          (room._sum.status / room._count.bed) * 100
                        ),
                      },
                      text: {
                        fill: "#000",
                        fontSize: "20px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default AdminRooms;
