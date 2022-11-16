import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../services/url.service";
import axios from "axios";
import {headerToken} from "../services/http.service";
import { handleError } from "../services/error.service";
import {contextPrototype} from "../services/usersContext.service";
import wrong from "../assets/sounds/wrong-answer.mp3";
import right from "../assets/sounds/right-answer.mp3";
import quizz from "../assets/sounds/quizz.mp3";

export default function Play( { setScore, setHistorique, historique } ) {
  const [questions, setQuestions] = useState([]);
  const [idArray, setidArray] = useState(0);
  const [bonneReponse, setBonneReponse] = useState(null);
  const [reponseSelected, setReponseSelected] = useState(null);

  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [quizzSoundBackground, setAudio] = useState( new Audio(quizz) );

  const params = useParams();
  const navigate = useNavigate();

  const handleClickReponse = async (reponse, index) => {

    if(reponseSelected != null) {
      return;
    }

    setIsActive(false);
    setReponseSelected(index);

    const data = {
      userId: contextPrototype.user.id,
      reponse: reponse
    }

    axios.post(`${API}/question/${questions[idArray]?.id}/valide`, data, headerToken)
      .then((res) => {
        reponse ? (res.data.success ? new Audio(right).play() : new Audio(wrong).play()) : new Audio(wrong).play()
        setBonneReponse(res.data.bonneReponse)
        setHistorique([...historique, {'question': questions[idArray]?.description, 'reponse': reponse, 'bonneReponse': res.data.bonneReponse, 'statut': res.data.success}])
        setScore(res.data.score);
      })
      .catch((err) => {
        handleError(err);
      });
      await timeout(1000);
      setReponseSelected(null);
      setidArray(idArray + 1);
      setBonneReponse(null);
      setIsActive(true);
      setMilliseconds(0);

      if(idArray === 9) {
        quizzSoundBackground.pause();
        navigate(`/resultat/${params.id}`)
      }
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const init = () => {
    if (!params.id) return;
    axios
        .get(`${API}/question/random/categorie/${params.id}?number=10`, headerToken)
        .then(res => setQuestions(res.data))
        .catch((err) => handleError(err));
      quizzSoundBackground.play();
  }

  const interval = () => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds(milliseconds => milliseconds + 200);
      }, 200);
      if(milliseconds === 10000) {
        handleClickReponse("", null);
      }
    } else if (!isActive && milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }

  useEffect(init, [params.id]);
  useEffect(interval, [isActive, milliseconds]);

  function getBackground(reponse, index) {
    if(!bonneReponse) {
      return "";
    }

    if(reponse === bonneReponse) {
      return 'bg-success win';
    }

    if(index === reponseSelected && reponse !== bonneReponse) {
      return 'bg-danger lose';
    }
  }

  return (
    <>
      <h1 className="leader-title"> Question {idArray + 1}</h1>
      <div className="play-box">
        <h3>{questions[idArray]?.description}</h3>
      </div>
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-timer" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width : `${100-(milliseconds/100)}%`}}/>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-center">
          <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse1, 1)} onClick={ () => handleClickReponse(questions[idArray]?.reponse1, 1) }><label className="m-auto">{questions[idArray]?.reponse1}</label></div>
          <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse2, 2)} onClick={ () => handleClickReponse(questions[idArray]?.reponse2, 2) }><label className="m-auto">{questions[idArray]?.reponse2}</label></div>
        </div>
        <div className="d-flex justify-content-center">
          <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse3, 3)} onClick={ () => handleClickReponse(questions[idArray]?.reponse3, 3) }><label className="m-auto">{questions[idArray]?.reponse3}</label></div>
          <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse4, 4)} onClick={ () => handleClickReponse(questions[idArray]?.reponse4, 4) }><label className="m-auto">{questions[idArray]?.reponse4}</label></div>
        </div>
      </div>
    </>
  );
}
