import Swal from "sweetalert2";

const SuccessAlert = ({ title, text }) => {
    return Swal.fire({
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500,
    });
};



const ErrorAlert = ({ text }) => {
    return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: text,
    });
};

export { SuccessAlert, ErrorAlert };
