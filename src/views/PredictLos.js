import React, { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../routes/Config";

const PredictLos = () => {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");

  const { id } = useParams();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("labs", JSON.stringify({ ...data, patientId: id }));
    window.location.href = "/predict-result";
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
        <div className="card text-start py-4 px-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumTransfers</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumTransfers"
                  name="NumTransfers"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumDiagnosis</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumDiagnosis"
                  name="NumDiagnosis"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumNotes</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumNotes"
                  name="NumNotes"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumLabs</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumLabs"
                  name="NumLabs"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">TotalNumInteract</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="TotalNumInteract"
                  name="TotalNumInteract"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumChartEvents</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumChartEvents"
                  name="NumChartEvents"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumProcs</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumProcs"
                  name="NumProcs"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumMicroLabs</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumMicroLabs"
                  name="NumMicroLabs"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumInput</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumInput"
                  name="NumInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumRx</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumRx"
                  name="NumRx"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumOutput</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumOutput"
                  name="NumOutput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumCPTevents</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumCPTevents"
                  name="NumCPTevents"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumCallouts</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder=""
                  aria-label="NumCallouts"
                  name="NumCallouts"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              <button type="submit" className="btn btn-primary col-md-4 col-6">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default PredictLos;
