import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL, pythonURL } from "../routes/Config";
import Swal from "sweetalert2";
import TokenExpired from "../components/TokenExpired";

const PredictResult = () => {
  const token = sessionStorage.getItem("token");

  const labs = JSON.parse(sessionStorage.getItem("labs"));

  const [data, setData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);

  const [los, setLos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `${baseURL}/api/predict`,
        labs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLos(Math.ceil(res.data.data.prediction[0]));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
      });

    axios
      .get(`${baseURL}/api/beds?status=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAvailableBeds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
      });

    axios
      .get(`${baseURL}/api/rooms?status=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRooms(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
        setLoading(false);
      });
  }, [token]);

  const handleRoomChange = (e) => {
    axios
      .get(`${baseURL}/api/bed/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBeds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          TokenExpired();
        }
      });
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
      title: "Simpan Data Pasien?",
      text: "Apakah anda yakin ingin menyimpan data pasien ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${baseURL}/api/los`,
            {
              ...labs,
              ...data,
              estimate: los,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            sessionStorage.removeItem("labs");
            Swal.fire("Berhasil!", "Data berhasil disimpan.", "success").then(
              () => {
                window.location.href = `/history/${labs.patientId}`;
              }
            );
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
              window.location.reload();
            }
            Swal.fire("Gagal!", "Gagal menyimpan data.", "error").then(() => {
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
              <h3>Predict LOS</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <form onSubmit={handleSubmit}>
          <div className="card d-flex flex-column justify-content-center align-items-center py-4 px-5">
            <h3>Hasil Prediksi LOS:</h3>
            <div className="los row justify-content-center align-content-center mt-4">
              <div className="result row justify-content-center align-content-center text-light fw-bold">
                {los}
              </div>
            </div>
            <span className="los-label fw-bold mt-2">Hari</span>

            <div className="mt-5 detail col-5 d-flex flex-column justify-content-center">
              <div className="row text-start fw-bold mb-3">
                <div className="col-6">Nama Pasien</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-5">John Doe</div>
              </div>
              <div className="row text-start fw-bold mb-3">
                <div className="col-6">Jenis Kelamin</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-5">Laki-Laki</div>
              </div>
              <div className="row text-start fw-bold mb-3">
                <div className="col-6">Tempat Tidur Tersedia</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-5">
                  {availableBeds.length > 0 ? (
                    availableBeds.map((bed, index) => (
                      <span key={index} className="text-success">
                        {bed.room + "." + bed.bed}
                        {index === availableBeds.length - 1 ? "" : ", "}
                      </span>
                    ))
                  ) : (
                    <span className="text-danger">Tidak ada tempat tidur</span>
                  )}
                </div>
              </div>
              <div className="row text-start fw-bold mb-3">
                <div className="col-6">Pilih Ruangan</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-5">
                  <select
                    name="room"
                    className="form-select sm text-dark py-0"
                    onChange={handleRoomChange}
                    defaultValue=""
                    required
                  >
                    <option value="">--Ruangan--</option>
                    {rooms.map((room, index) => (
                      <option key={index} value={room.room}>
                        {room.room}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row text-start fw-bold mb-3">
                <div className="col-6">Pilih Tempat Tidur</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-5">
                  <select
                    name="bedId"
                    className="form-select sm py-0"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  >
                    <option value="">--Tempat Tidur--</option>
                    {beds.map((bed, index) => (
                      <option key={index} value={bed.id}>
                        {bed.bed}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex flex-row mt-4">
                <NavLink
                  to={`/predict/${labs.patientId}`}
                  className="btn btn-outline-danger col-6 me-4"
                >
                  Ulang
                </NavLink>
                <button type="submit" className="btn btn-primary col-6">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </AppLayout>
  );
};

export default PredictResult;
