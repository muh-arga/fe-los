import Swal from "sweetalert2";

function TokenExpired() {
  Swal.fire("Unauthorized", "Token expired!", "error").then(() => {
    window.location.reload();
  });
}

export default TokenExpired;