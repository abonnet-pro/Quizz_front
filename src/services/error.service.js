import {toast} from "react-toastify";

export const handleError = (error) => {
    if(error.response.status === 403) {
        toast.error("Accès non autorisé");
    } else if (error.response.status === 500)  {
        toast.error(error.response.data);
    } else {
        toast.error("Erreur inconnue");
    }
}
