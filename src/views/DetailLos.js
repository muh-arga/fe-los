import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import axios from "axios";
import { baseURL } from "../routes/Config";
import moment from "moment";
import TokenExpired from "../components/TokenExpired";

const DetailLos = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/api/los/${id}`, {
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
  }, []);

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
          {!loading ? (
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-row justify-content-center col-12">
                <div
                  className={`${
                    data.actual ? "col-md-4 col-6" : "col-12"
                  } row justify-content-center`}
                >
                  <h5 className="mt-4 mb-2 fw-bold">Predict</h5>
                  <div className="los detail row justify-content-center align-content-center">
                    <div className="result row justify-content-center align-content-center text-light fw-bold">
                      {data.estimate}
                    </div>
                  </div>
                  <span className="los-label fw-bold mt-2">Hari</span>
                </div>
                {data.actual ? (
                  <div className="col-md-4 col-6 row justify-content-center">
                    <h5 className="mt-4 mb-2 fw-bold">Actual</h5>
                    <div className="los detail actual row justify-content-center align-content-center">
                      <div className="result row justify-content-center align-content-center text-light fw-bold">
                        {data.actual}
                      </div>
                    </div>
                    <span className="los-label actual fw-bold mt-2">Hari</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="detail mt-4 text-start col-12 d-flex flex-column justify-content-between">
                <div className="row">
                  <div className="col-3">
                    <p>Nama Pasien: {data.patient.name}</p>
                  </div>
                  <div className="col-3">
                    <p>
                      Tanggal: {moment(data.startDate).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className="col-3">
                    <p>Ruangan: {data.bed.room}</p>
                  </div>
                  <div className="col-3">
                    <p>Kamar Tidur: {data.bed.bed}</p>
                  </div>
                </div>

                <div className="row justify-content-between fw-bold mb-3 mt-3 w-100">
                  <div className="row col-4">
                    <div className="col-6">Umur</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.age}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumTransfers</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumTransfers}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumDiagnosis</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumDiagnosis}</div>
                  </div>
                </div>

                <div className="row justify-content-between text-start fw-bold mb-3 w-100">
                  <div className="row col-4">
                    <div className="col-6">JK</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.patient.gender}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumNotes</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumNotes}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumLabs</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumLabs}</div>
                  </div>
                </div>

                <div className="row justify-content-between text-start fw-bold mb-3 w-100">
                  <div className="row col-4">
                    <div className="col-6">TotalNumInteract</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.TotalNumInteract}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumChartEvents</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumChartEvents}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumProcs</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumProcs}</div>
                  </div>
                </div>

                <div className="row justify-content-between text-start fw-bold mb-3 w-100">
                  <div className="row col-4">
                    <div className="col-6">NumMicroLabs</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumMicroLabs}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumInput</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumInput}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumRx</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumRx}</div>
                  </div>
                </div>

                <div className="row justify-content-between text-start fw-bold mb-3 w-100">
                  <div className="row col-4">
                    <div className="col-6">NumOutput</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumOutput}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumCPTevents</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumCPTevents}</div>
                  </div>

                  <div className="row col-4">
                    <div className="col-6">NumCallouts</div>
                    <div className="col-1" style={{ width: "fit-content" }}>
                      :
                    </div>
                    <div className="col-4">{data.NumCallouts}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-center flex-row mt-4">
                  <button
                    onClick={goBack}
                    className="col-6 btn btn-primary"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default DetailLos;
