import React from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";

const PredictLos = () => {
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
          <form action="">
            <div className="row mb-4">
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumProcEvents</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumprocEvents"
                  name="numprocEvents"
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
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumMicrolabs</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumMicrolabs"
                  name="numMicrolabs"
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumTransfer</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumTransfer"
                  name="numTransfer"
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
                />
              </div>
              <div className="form-group col-md-3 col-sm-4 col-6">
                <label className="form-label">NumInput</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  aria-label="NumInput"
                  name=""
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
                />
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              <NavLink to="/predict-result" className="btn btn-primary col-md-4 col-6">Simpan</NavLink>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default PredictLos;
