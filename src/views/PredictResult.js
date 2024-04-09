import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";

const PredictResult = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const labs = JSON.parse(sessionStorage.getItem("labs"));

  const [los, setLos] = useState(0);

  useEffect(() => {
    const estimates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    setLos(estimates[Math.floor(Math.random() * estimates.length)]);
  }, [token]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        window.location.href = `/history/${labs.patientId}`;
      })
      .catch((err) => {
        console.log(err);
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
                <div className="col-5">R1.2, R2.4, R4.1</div>
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
                    onChange={handleChange}
                    defaultValue=""
                    required
                  >
                    <option value="">--Ruangan--</option>
                    <option value="R1">R1</option>
                    <option value="R2">R2</option>
                    <option value="R4">R4</option>
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
                    name="bed"
                    className="form-select sm py-0"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  >
                    <option value="">--Tempat Tidur--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-row mt-4">
                <NavLink
                  to="/predict"
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
