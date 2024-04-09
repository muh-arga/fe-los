import React from "react";

const LoginError = ({ message }) => {
  return (
    <div>
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{message ? message : "Email atau password salah!"}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default LoginError;
