import React from "react";
import { NavLink } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const DetailLos = () => {
  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Detail LOS</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card d-flex flex-column justify-content-center align-items-center py-4 px-5">
          <h3>Hasil Prediksi LOS:</h3>
          <div className="los detail row justify-content-center align-content-center mt-4">
            <div className="result row justify-content-center align-content-center text-light fw-bold">
              3
            </div>
          </div>
          <span className="los-label fw-bold mt-2">Hari</span>
          <div className="detail mt-4 text-start col-12 d-flex flex-column justify-content-between">
            <div className="row">
              <div className="col-3">
                <p>Nama Pasien: John Doe</p>
              </div>
              <div className="col-3">
                <p>Tanggal: 12-12-2023</p>
              </div>
              <div className="col-3">
                <p>Ruangan: R1</p>
              </div>
              <div className="col-3">
                <p>Kamar Tidur: 1</p>
              </div>
            </div>

            <div className="row justify-content-between fw-bold mb-3 mt-3 w-100">
              <div className="row col-4">
                <div className="col-6">Umur</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">46</div>
              </div>

              <div className="row col-4">
                <div className="col-6">TotalNumInteract</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">505.05</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumTransfer</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">0.97</div>
              </div>
            </div>

            <div className="row justify-content-between text-start fw-bold mb-3 w-100">
              <div className="row col-4">
                <div className="col-6">JK</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">Laki-Laki</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumProcs</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">0.39</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumRX</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">15.40</div>
              </div>
            </div>

            <div className="row justify-content-between text-start fw-bold mb-3 w-100">
              <div className="row col-4">
                <div className="col-6">NumProcEvents</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">0.97</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumCallouts</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">0.39</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumCPevents</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">430.41</div>
              </div>
            </div>

            <div className="row justify-content-between text-start fw-bold mb-3 w-100">
              <div className="row col-4">
                <div className="col-6">NumNotes</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">1.18</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumMicrolabs</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">0</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumDiagnosis</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">2.14</div>
              </div>
            </div>

            <div className="row justify-content-between text-start fw-bold mb-3 w-100">
              <div className="row col-4">
                <div className="col-6">NumLabs</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">29.43</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumInput</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">17.15</div>
              </div>

              <div className="row col-4">
                <div className="col-6">NumCharEvenets</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">430.41</div>
              </div>
            </div>

            <div className="row justify-content-between text-start fw-bold mb-3 w-100">
              <div className="row col-4">
                <div className="col-6">NumOutputs</div>
                <div className="col-1" style={{ width: "fit-content" }}>
                  :
                </div>
                <div className="col-4">5.65</div>
              </div>
            </div>

            <div className="d-flex justify-content-center flex-row mt-4">
              <NavLink to='/history' className="col-6 btn btn-primary">
                Kembali
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default DetailLos;
