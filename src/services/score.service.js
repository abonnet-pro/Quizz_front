import axios from "axios";
import {API} from "./url.service";
import {token} from "./http.service";
import {handleError} from "./error.service";

export function loadScore(setScore, userId) {
    if(!userId) return;

    axios.get(`${API}/score/user/${userId}`, {
        headers: { 'Authorization' : 'Bearer ' + token() }
    })
        .then(res => {
            setScore(res.data)
        })
        .catch(err => {
            handleError(err)
        })
}
