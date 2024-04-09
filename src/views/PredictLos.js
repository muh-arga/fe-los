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
                <label className="form-label">NumProcEvents</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumProcEvents"
                  name="numProcEvents"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumDiagnosis</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumDiagnosis"
                  name="numDiagnosis"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumMicroLabs</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumMicroLabs"
                  name="numMicroLabs"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumTransfers</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumTransfers"
                  name="numTransfers"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumNotes</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumNotes"
                  name="numNotes"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">TotalNumInteract</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="TotalNumInteract"
                  name="totalNumInteract"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumInput</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumInput"
                  name="numInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumRX</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumRX"
                  name="numRX"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumLabs</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumLabs"
                  name="numLabs"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumProcs</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumProcs"
                  name="numProcs"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumOutput</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumOutput"
                  name="numOutput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumCharEvents</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumCharEvents"
                  name="numCharEvents"
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
                  className="form-control"
                  placeholder=""
                  aria-label="NumCallouts"
                  name="numCallouts"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumCPevents</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumCPevents"
                  name="numCPevents"
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
