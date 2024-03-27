import React from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";

const PredictResult = () => {
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
        <div className="card d-flex flex-column justify-content-center align-items-center py-4 px-5">
          <h3>Hasil Prediksi LOS:</h3>
          <div className="los row justify-content-center align-content-center mt-4">
            <div className="result row justify-content-center align-content-center text-light fw-bold">
              3
            </div>
          </div>
          <span className="los-label fw-bold mt-2">Hari</span>

          <div className="mt-5 detail col-5 d-flex flex-column justify-content-center">
            <div className="row text-start fw-bold mb-3">
                <div className="col-6">
                    Nama Pasien
                </div>
                <div className="col-1" style={{width: "fit-content"}}>
                    :
                </div>
                <div className="col-5">
                    John Doe
                </div>
            </div>
            <div className="row text-start fw-bold mb-3">
                <div className="col-6">
                    Jenis Kelamin
                </div>
                <div className="col-1" style={{width: "fit-content"}}>
                    :
                </div>
                <div className="col-5">
                    Laki-Laki
                </div>
            </div>
            <div className="row text-start fw-bold mb-3">
                <div className="col-6">
                    Tempat Tidur Tersedia
                </div>
                <div className="col-1" style={{width: "fit-content"}}>
                    :
                </div>
                <div className="col-5">
                    R1.2, R2.4, R4.1
                </div>
            </div>
            <div className="row text-start fw-bold mb-3">
                <div className="col-6">
                    Pilih Ruangan
                </div>
                <div className="col-1" style={{width: "fit-content"}}>
                    :
                </div>
                <div className="col-5">
                    <select name="room" className="form-select sm">
                        <option value="R1">R1</option>
                        <option value="R2">R2</option>
                        <option value="R4">R4</option>
                    </select>
                </div>
            </div>
            <div className="row text-start fw-bold mb-3">
                <div className="col-6">
                    Pilih Tempat Tidur
                </div>
                <div className="col-1" style={{width: "fit-content"}}>
                    :
                </div>
                <div className="col-5">
                    <select name="room" className="form-select sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <div className="d-flex flex-row mt-4">
                <NavLink to='/predict' className="btn btn-outline-danger col-6 me-4">Ulang</NavLink>
                <NavLink to='/history' className="btn btn-primary col-6">Simpan</NavLink>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default PredictResult;
