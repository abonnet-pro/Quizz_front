import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../services/url.service";
import axios from "axios";
import {headerToken, token} from "../services/http.service";
import { handleError } from "../services/error.service";
import {toast} from "react-toastify";
import {contextPrototype} from "../services/usersContext.service";

export default function Play( { setScore, setHistorique, historique } ) {
  const [questions, setQuestions] = useState([]);
  const [idArray, setidArray] = useState(0);
  const [ActualScore, setActualScore] = useState(0);
  const [bonneReponse, setBonneReponse] = useState(null);
  const [reponseSelected, setReponseSelected] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const handleClickReponse = async (reponse, index) => {

    setReponseSelected(index);

    const data = {
      userId: contextPrototype.user.id,
      reponse: reponse
    }

    axios.post(`${API}/question/${questions[idArray]?.id}/valide`, data, headerToken)
      .then((res) => {
        setActualScore(ActualScore + res.data.success ? 1 : -1);
        setBonneReponse(res.data.bonneReponse)
        setHistorique([...historique, {'question': questions[idArray]?.description, 'reponse': reponse, 'bonneReponse': res.data.bonneReponse, 'statut': res.data.success}])
        setScore(res.data.score);
      })
      .catch((err) => {
        handleError(err);
      });

      if(idArray === 9) {
        navigate("/resultat", { state: {ActualScore} })
      }
      await timeout(1000);
      setReponseSelected(null);
      setidArray(idArray + 1)
      setBonneReponse(null)
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    if (!params.id) return;
    axios
      .get(`${API}/question/random/categorie/${params.id}?number=10`, headerToken)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [params.id]);

  function isBonneReponse(reponse) {
    return reponse === bonneReponse;
  }

  function getBackground(reponse, index) {
    if(reponse === bonneReponse) {
      return 'bg-success';
    }

    if(index === reponseSelected && reponse !== bonneReponse) {
      return 'bg-danger';
    }

    return "";
  }

  return (
    <>
      <h1 className="leader-title"> Question {idArray + 1}</h1>
      <div className="play-box">
        <h3>{questions[idArray]?.description}</h3>
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
