import React, {useEffect, useState} from "react";

export default function Resultat({ historique }) {

    const [resultat, setResultat] = useState(null);

    const calculResultat = () => {
        let points = 0;
        for(let res of historique) {
            points = points + (res.statut ? 1 : -1)
            console.log(points)
        }
        setResultat(points);
    }

    function getResultat() {
        if(resultat === 0) {
            return "Vous n'avez ni perdu ni gagné de point"
        }
        if(resultat > 0) {
            return `Vous avez gagné ${resultat} points !`
        }
        if(resultat < 0) {
            return `Vous avez perdu ${Math.abs(resultat)} points !`
        }

        return "";
    }

    useEffect(calculResultat, [historique]);

  return (
    <>
      <div>
        <h2 className="text-white mb-5 mt-5">{ getResultat() }</h2>
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
