import React, {useEffect, useState} from 'react'
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {contextPrototype} from "../services/usersContext.service";

export default function Leaderboard() {

  const [ladder, setLadder] = useState([]);
  const [myScore, setMyScore] = useState({position: 0, score: null});
  const [categories, setCategories] = useState([]);

  const loadLadder = () => {
    axios.get(`${API}/score/ladder`, headerToken)
        .then(res => {
          setLadder(res.data);
          getMyScore(res.data);
        })
        .catch(err => {
          handleError(err)
        });

      axios.get(`${API}/categorie/all`, headerToken)
          .then(res => {
              setCategories(res.data)
          })
          .catch(err => {
              handleError(err)
          })
  }

  function getMyScore(ladder) {
      let i = ladder.findIndex(s => s.username === contextPrototype.user.username);
      setMyScore({position: i, score: ladder[i]});
  }

  const handleChangeSelect = (event) => {
      axios.get(`${API}/score/ladder?categorie=${event.target.value}`, headerToken)
          .then(res => {
              setLadder(res.data);
              getMyScore(res.data);
          })
          .catch(err => {
              handleError(err)
          });
  }

  useEffect(loadLadder, []);

  return (
    <>
      <br />
        <div className="d-flex justify-content-between">
            <h1 className='leader-title'>Classement des meilleurs joueurs</h1>
            <div className="align-self-center">
                <select className="form-select" onChange={handleChangeSelect}>
                    <option value="">Toutes catégories</option>
                    {
                        categories.map(categorie => {
                            return(
                                <>
                                    <option value={categorie.id}>{categorie.name}</option>
                                </>
                            )
                        })
                    }
                </select>
            </div>
        </div>
      <br />

      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">Joueur</th>
            <th className="center" scope="col">Score</th>
            <th className="center" scope="col">Trophé Or</th>
            <th className="center" scope="col">Trophé Argent</th>
            <th className="center" scope="col">Trophé Bronze</th>
          </tr>
        </thead>
        <tbody>
            {
              ladder.length > 0 ?
              ladder.map((score, index) => {
                return(
                    <>
                      <tr className="table-light">
                        <th scope="row">#{index+1} {score.username}</th>
                        <td className="center">{score.score}</td>
                        <td className="center">{score.nbMedailleOr}</td>
                        <td className="center">{score.nbMedailleArgent}</td>
                        <td className="center">{score.nbMedailleBronze}</td>
                      </tr>
                    </>
                )
              }) :
                  <>
                      <tr className="table-light">
                          <td colSpan={5} className="center">Aucun résultat</td>
                      </tr>
                  </>
            }
        </tbody>
      </table>
      <h3 className='leader-title mt-5'>Votre position dans le classement</h3>
      <table className="table table-hover">
          <thead>
          <tr className="table-dark">
              <th scope="col">Joueur</th>
              <th className="center" scope="col">Score</th>
              <th className="center" scope="col">Trophé Or</th>
              <th className="center" scope="col">Trophé Argent</th>
              <th className="center" scope="col">Trophé Bronze</th>
          </tr>
          </thead>
        <tbody>
        {
            myScore.score ?
                <tr className="table-dark">
                    <th scope="col">#{myScore.position +1 } {myScore.score?.username}</th>
                    <td className="center">{myScore.score?.score}</td>
                    <td className="center">{myScore.score?.nbMedailleOr}</td>
                    <td className="center">{myScore.score?.nbMedailleArgent}</td>
                    <td className="center">{myScore.score?.nbMedailleBronze}</td>
                </tr> :
                <tr className="table-dark">
                    <td colSpan={5} className="center">Aucun résultat</td>
                </tr>
        }
        </tbody>
      </table>
    </>
  )
}
