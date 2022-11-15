import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Protected = ({ isAdmin, isLoggedIn, isPageLogin, children }) => {
  let isEmpty;
  if (typeof isLoggedIn != "undefined") {
    if(isLoggedIn === null) {
      isEmpty = true;
    }
    else {
    isEmpty = Object.keys(isLoggedIn).length === 0;
    }
  }
  else {
    isEmpty = true;
  }
 if (isEmpty === true && isPageLogin === false ) {
    toast.warning(`Vous ne pouvez pas accéder à ceci car vous n'êtes pas connecté`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
 return <Navigate to="/login" replace />;
 }
 else if (isEmpty === false && isPageLogin === true) {
    toast.warning(`Vous ne pouvez pas accéder à ceci car vous êtes déjà connecté`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
 return <Navigate to="/" replace />;
 }
 else {
     if(isAdmin && isLoggedIn.role !== "ADMIN") {
        toast.warning(`Vous ne pouvez pas accéder à ceci car vous n'êtes pas administrateur`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
     return <Navigate to="/" replace />;
     }
 }
 return children;
};
export default Protected;