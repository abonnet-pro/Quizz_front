import React from "react";
import { useLocation } from "react-router-dom";

export default function Resultat({ historique }) {
  const { state } = useLocation();
  return (
    <>
      <div>
        <h2> Votre résultat final est de {state.ActualScore}</h2>
      </div>
      <table class="table table-hover">
        <thead>
          <tr class="table-primary">
            <th scope="col">Question</th>
            <th scope="col">Votre réponse</th>
            <th scope="col">Bonne Réponse</th>
          </tr>
        </thead>
        <tbody>
          {historique.map((history) => (
            <>
              {history.statut ? (
                <tr class="table-success">
                  <th scope="row">{history.question}</th>
                  <td>{history.reponse}</td>
                  <td>/</td>
                </tr>
              ) : (
                <tr class="table-danger">
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
