import React from "react";
import AppLayout from "../layouts/AppLayout";
import { NavLink } from "react-router-dom";

const AddPatient = () => {
  return (
    <AppLayout>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 text-start">
              <h3>Tambah Data Pasien</h3>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card text-start py-4 px-5">
          <form action="">
            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Nama Pasien</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Pasien"
                  aria-label="Name"
                  name="name"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Tempat Lahir</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tempat Lahir"
                  aria-label="Birth_Place"
                  name="birth_place"
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">NIK</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NIK"
                  aria-label="NIK"
                  name="nik"
                />
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  className="form-control"
                  aria-label="Birth_Date"
                  name="birth_date"
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Jenis Kelamin</label>
                <select name="gender" className="form-select">
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="form-group col-md-6 col-12">
                <label className="form-label">Alamat</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tempat Lahir"
                  aria-label="Tempat_Lahir"
                  name="address"
                />
              </div>
            </div>

            <div className="row justify-content-center mt-5">
                <NavLink to="/predict" className="btn btn-primary col-md-4 col-6">Simpan</NavLink>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};

export default AddPatient;
