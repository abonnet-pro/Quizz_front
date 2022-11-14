import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../services/url.service";
import axios from "axios";
import { token } from "../services/http.service";
import { handleError } from "../services/error.service";
import { getLocalStorage } from "../services/localStorage.service";
import {toast} from "react-toastify";

export default function Play( { setScore, score } ) {
  const [questions, setQuestions] = useState([]);
  const [idArray, setidArray] = useState(0);
  const [ActualScore, setActualScore] = useState(0);
  const [idQuestion, setIdQuestion] = useState(0);
  const [reponses, setReponses] = useState({ reponse: ''});
  const [radioState, setradioState] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setradioState(event.target.value)
    const key = event.target.name
    const value = event.target.value
    setReponses({ ...reponses, [key]: value })
    setIdQuestion(questions[idArray]?.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    if(reponses.reponse === '' || reponses.reponse === undefined || reponses.reponse === null) {
      toast.error("Aucune réponse selectionnée")
      return;
    }

    setidArray(idArray + 1)

    const data = {
      userId: getLocalStorage("user").id,
      reponse: reponses.reponse
    }

    axios.post(`${API}/question/${idQuestion}/valide`, data, {
        headers: { Authorization: "Bearer " + token() },
      })
      .then((res) => {
        if(res.data.success === false) {
          toast.error(`Mauvaise réponse. La bonne réponse était ${res.data.bonneReponse}`)
        }
        else {
          toast.success(`Bonne réponse`)
          setActualScore(ActualScore + 1)
        }
      })
      .catch((err) => {
        handleError(err);
      });
      if(idArray === 9) {
        navigate("/resultat", { state: {ActualScore} })
      }
      setReponses("")
   
  } 

  useEffect(() => {
    if (!params.id) return;
    axios
      .get(`${API}/question/random/categorie/${params.id}?number=10`, {
        headers: { Authorization: "Bearer " + token() },
      })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [params.id]);

  return (
    <>
      <h1 className="leader-title"> Question {idArray + 1}</h1>
      <form onSubmit={handleSubmit}>
        <table className="play-box">
          <thead>
          <tr style={{ textAlign: "center" }}>
            <th colSpan="2" className="playTable">
              <h3>{questions[idArray]?.description}</h3>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="playTable">
              <input
                className="form-check-input"
                type="radio"
                name="reponse"
                id="reponse1"
                checked={radioState === questions[idArray]?.reponse1}
                value={questions[idArray]?.reponse1}
                onChange={ handleChange }
                />
              <span className="questionLabel">
                {questions[idArray]?.reponse1}
              </span>
            </td>
            <td className="playTable">
              <input
                className="form-check-input"
                type="radio"
                name="reponse"
                id="reponse2"
                checked={radioState === questions[idArray]?.reponse2}
                value={questions[idArray]?.reponse2}
                onChange={ handleChange }
              />
              <span className="questionLabel">
                {questions[idArray]?.reponse2}
              </span>
            </td>
          </tr>
          <tr>
            <td className="playTable">
              <input
                className="form-check-input"
                type="radio"
                name="reponse"
                id="reponse3"
                checked={radioState === questions[idArray]?.reponse3}
                value={questions[idArray]?.reponse3}
                onChange={ handleChange }
              />
              <span className="questionLabel">
                {questions[idArray]?.reponse3}
              </span>
            </td>
            <td className="playTable">
              <input
                className="form-check-input"
                type="radio"
                name="reponse"
                id="reponse4"
                checked={radioState === questions[idArray]?.reponse4}
                value={questions[idArray]?.reponse4}
                onChange={ handleChange }
              />
              <span className="questionLabel">
                {questions[idArray]?.reponse4}
              </span>
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td colSpan="4" className="playTable">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
