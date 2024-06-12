import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { CustomNavLink, CustomNavLinkAdmin } from "./CustomNavLink";

export const AdminSidebar = () => {
  const onLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Apakah anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    });
  };

  return (
    <div>
      <div className="sidebar-wrapper active min-vh-100 d-flex flex-column">
        <div className="sidebar-header position-relative">
          <div className="d-flex justify-content-start align-items-center">
            <div className="logo px-4">
              <a
                href="index.html"
                className="d-flex align-items-center text-decoration-none text-dark"
              >
                <img
                  src="/assets/img/logo.png"
                  alt="Logo"
                  style={{ width: "50px", height: "50px" }}
                />
                <h5 className="fw-bold ms-2">LosPrediction</h5>
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu mt-4">
            <li className="sidebar-title text-start mt-0">Menu</li>
            <li className="sidebar-item">
              <CustomNavLink to="/admin" paths={[]}>
                <i className="bi bi-person-fill"></i>
                <span>User</span>
              </CustomNavLink>
            </li>
            <li className="sidebar-item">
              <CustomNavLink to="/approve" paths={["/approve"]}>
                <i className="bi bi-person-fill-check"></i>
                <span>Approve User</span>
              </CustomNavLink>
            </li>
            <li className="sidebar-item">
              <CustomNavLink to="/rooms/admin" paths={[]}>
                <i className="bi bi-box-fill"></i>
                <span>Kamar</span>
              </CustomNavLink>
            </li>
          </ul>
        </div>
        <div className="logout mt-auto">
          <button
            className="btn btn-danger col-12 rounded-0"
            onClick={onLogout}
          >
            <i className="bi bi-box-arrow-left me-2 text-light"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;