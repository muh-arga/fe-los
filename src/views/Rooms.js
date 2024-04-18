import React, { useEffect, useState, useRef } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";
import "datatables.net-responsive-bs5";
import $ from "jquery";
import moment from "moment";
import TokenExpired from "../components/TokenExpired";

const Rooms = () => {
  $.DataTable = require("datatables.net-bs5");

  const tableRef = useRef();
  const token = sessionStorage.getItem("token");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [available, setAvailable] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${baseURL}/api/beds?status=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotal(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
          TokenExpired()
        }
      });

    axios
      .get(`${baseURL}/api/beds?room=${room}&status=${available}`, {
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

    axios
      .get(`${baseURL}/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRooms(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
          TokenExpired()
        }
      });
  }, [available, room]);

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

  const handleAvailableChange = (e) => {
    e.preventDefault();
    setAvailable(e.target.value);
  };

  const handleRoomChange = (e) => {
    e.preventDefault();
    setRoom(e.target.value);
  };

  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Daftar Kamar</h3>
              <div className="d-flex flex-column pe-5">
                <p className="text-subtitle text-muted d-flex justify-content-between col-4">
                  Kamar Tersedia
                  <span
                    className="badge bg-success-light"
                    style={{ width: "fit-content" }}
                  >
                    {total ?? 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="filter d-flex flex-row gap-2 mb-4">
          <div className="card p-0" style={{ width: "fit-content" }}>
            <select
              name="available"
              className="form-select py-0"
              onChange={handleAvailableChange}
            >
              <option value="">Semua</option>
              <option value="0">Tersedia</option>
              <option value="1">Terisi</option>
            </select>
          </div>
          <div className="card p-0" style={{ width: "fit-content" }}>
            <select
              name="room"
              className="form-select py-0"
              onChange={handleRoomChange}
            >
              <option value="">Semua</option>
              {rooms.map((item, index) => (
                <option key={index} value={item.room}>
                  {item.room}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="patient-data">
          <table
            className="table table-bordered table-hover display table-sx w-100"
            ref={tableRef}
          >
            <thead>
              <tr>
                <th style={{ width: "10px" }}>No</th>
                <th>Room</th>
                <th>Bed</th>
                <th>Status</th>
                <th>Los</th>
                <th>Estimasi Keluar</th>
                <th>Name</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.room}</td>
                  <td>{item.bed}</td>
                  <td>
                    {item.status === 0 ? (
                      <span className="badge bg-success">Tersedia</span>
                    ) : (
                      <span className="badge bg-danger">Terisi</span>
                    )}
                  </td>
                  <td>
                    {item.los.length > 0 ? item.los[0].estimate + " Hari" : "-"}
                  </td>
                  <td>
                    {item.los.length > 0
                      ? moment(item.los[0].startDate)
                          .add(item.los[0].estimate, "days")
                          .format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td>
                    {item.los.length > 0 ? item.los[0].patient.name : "-"}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center px-4">
                      {item.los.length > 0 ? (
                        <NavLink
                          to={`/detail-los/${item.los[0].id}`}
                          className="btn btn-primary col-12"
                        >
                          <i className="bi bi-eye-fill me-2 text-light"></i>
                          Detail
                        </NavLink>
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

export default Rooms;
