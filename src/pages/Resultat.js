import React, {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {useParams} from "react-router-dom";
import {contextPrototype} from "../services/usersContext.service";

export default function Resultat({ historique, setScore }) {

    const params = useParams();
    const [resultat, setResultat] = useState({points: 0, medailleOr: false, medailleArgent: false, medailleBronze: false});

    const calculResultat = () => {
        let points = 0;
        let nbBonneReponse = 0;
        for(let res of historique) {
            points = points + (res.statut ? 1 : -1);
            nbBonneReponse = nbBonneReponse + (res.statut ? 1 : 0);
        }

        let medailleOr = nbBonneReponse === historique.length;
        let medailleArgent = nbBonneReponse < (historique.length) && nbBonneReponse >= (historique.length * 0.7);
        let medailleBronze = nbBonneReponse < (historique.length * 0.7) && nbBonneReponse >= (historique.length * 0.5);

        setResultat({points: points, medailleOr: medailleOr, medailleArgent: medailleArgent, medailleBronze: medailleBronze});

        let data = {
            userId: contextPrototype.user.id,
            categorieId: params.id,
            medailleOr: medailleOr,
            medailleArgent: medailleArgent,
            medailleBronze: medailleBronze
        }

        axios.post(`${API}/score/termine/quizz`, data, headerToken)
            .then((res) => {
                setScore(res.data);
            })
            .catch((err) => {
                handleError(err);
            });
    }

    function getResultat() {
        if(resultat.points === 0) {
            return "Oups vous n'avez ni perdu ni gagné de point"
        }
        if(resultat.points > 0) {
            return `Bravo Vous avez gagné ${resultat.points} points !`
        }
        if(resultat.points < 0) {
            return `Aïe vous avez perdu ${Math.abs(resultat.points)} points !`
        }

        return "";
    }

    function tropheeGagne() {
        return resultat.medailleOr || resultat.medailleArgent || resultat.medailleBronze;
    }

    function getTrophee() {
        if(!tropheeGagne()) {
            return "Vous n'avez gagné aucun trophée";
        }

        return "Vous avez gagné ";
    }

    function getColorTrophee() {
        if(resultat.medailleOr) {
            return "or";
        }

        if(resultat.medailleArgent) {
            return "argent";
        }

        if(resultat.medailleBronze) {
            return "bronze";
        }
    }

    useEffect(calculResultat, [historique]);

  return (
    <>
        <div>
            <h2 className="text-white mb-5 mt-5">{ getResultat() }</h2>
            <h4 className="text-white mb-5 mt-5">{ getTrophee() }
                {
                    tropheeGagne() ? <i className={"ms-2 bi bi-trophy me-1 or " + (getColorTrophee())}/> : <></>
                }
            </h4>
        </div>
        <table className="table table-hover">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Question</th>
                    <th scope="col">Votre réponse</th>
                    <th scope="col">Bonne Réponse</th>
                </tr>
            </thead>
            <tbody>
                {historique.map((history) => (
                    <>
                        {history.statut ? (
                            <tr className="table-success">
                                <th scope="row">{history.question}</th>
                                <td>{history.reponse}</td>
                                <td>/</td>
                            </tr>
                        ) : (
                            <tr className="table-danger">
                                <th scope="row">{history.question}</th>
                                <td>{history.reponse}</td>
                                <td>{history.bonneReponse}</td>
                            </tr>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    </>
  );
}
