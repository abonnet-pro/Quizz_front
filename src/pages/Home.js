import React, {useEffect, useState} from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";
import {contextPrototype} from "../services/usersContext.service";
import axios from "axios";
import {API} from "../services/url.service";
import {token} from "../services/http.service";
import {handleError} from "../services/error.service";

export default function Home({ setScore, user, setHistorique }) {

  const init = () => {
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
        contextPrototype.user ? <Link to="wheel" className="btn-lancer-quizz">Lancer un Quizz !</Link> : ( 
        <>
        <div className="box-home">
          <h1 className="leader-title">Bienvenu sur Quizz Game</h1><br/>
          <h4>Pour accèder à l'entiereté du quizz et de ses fonctionnalités, vous devez vous connecter. Vient détrôner notre champion et soit à ton tour le leader de Quizz Game. <br /><br />
          <Link to='/signup' className='link-home'> Crée un compte</Link> maintenant ou <Link className='link-home' to='/login'>connecte toi </Link>pour rejoindre l'aventure</h4>

        </div>
        </> 
        )
      }
    </>
  )
}
