import React, {useEffect, useState} from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";
import {contextPrototype} from "../services/usersContext.service";
import axios from "axios";
import {API} from "../services/url.service";
import {token} from "../services/http.service";
import {handleError} from "../services/error.service";

export default function Home({ setScore, user }) {

  const init = () => {
    Aos.init({once : 'true'});

    if(!user) {
      return;
    }

    axios.get(`${API}/score/user/${user.id}`, {
      headers: { 'Authorization' : 'Bearer ' + token() }
    })
        .then(res => {
          setScore(res.data)
        })
        .catch(err => {
          handleError(err)
        })
  }

  useEffect(init, [user]);

  return (
    <>
      {
        contextPrototype.user ? <Link to="wheel" className="btn-lancer-quizz">Lancer un Quizz !</Link> : <></>
      }
    </>
  )
}
