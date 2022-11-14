import React, {useEffect, useState} from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";
import {contextPrototype} from "../services/usersContext.service";
import axios from "axios";
import {API} from "../services/url.service";
import {token} from "../services/http.service";
import {handleError} from "../services/error.service";
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home({ setScore, user, setHistorique }) {
  const [isLoading, setIsLoading] = useState(false);

  const init = () => {
    setIsLoading(true)
    setHistorique([])
    Aos.init({once : 'true'});

    if(!user) {
      return;
    }


    axios.get(`${API}/score/user/${user.id}`, {
      headers: { 'Authorization' : 'Bearer ' + token() }
    })
        .then(res => {
          setScore(res.data)
          setIsLoading(false)
        })
        .catch(err => {
          handleError(err)
        })
  }

  useEffect(init, [user]);

  return (
    <>
      {
        isLoading ? <LoadingSpinner /> : contextPrototype.user ? <Link to="wheel" className="btn-lancer-quizz">Lancer un Quizz !</Link> : <></>
      }
    </>
  )
}
