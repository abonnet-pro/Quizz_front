import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../services/url.service";
import { token } from "../services/http.service";
import { handleError } from "../services/error.service";

export default function BoxCategorie({ details }) {
  const [ladder, setLadder] = useState([]);

  const loadLadder = () => {
    axios
      .get(`${API}/score/ladder?categorie=${details.id}`, {
        headers: { Authorization: "Bearer " + token() },
      })
      .then((res) => {
        setLadder(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(loadLadder, []);

  return (
    <div className="col-lg-4">
      {
        <>
          <div class="card text-white bg-light text-dark mb-3">
            <div class={`card-header text-dark`}>{details.name}</div>
            <div class="card-body text-dark">
              {`Es-tu incollable en ${details.name} ? Vient exprimer tes connaissances au travers de cette session de 10 questions`}
              <br />
              <br />
              <table>
                <tr>
                  <td>
                    <span className="or">
                      <i className="bi bi-trophy me-1"></i>
                    </span>
                  </td>
                  <td>
                    {ladder.slice(0, 1).map((data) => (
                      <span>{data.username}</span>
                    ))}
                  </td>
                  </tr>
                  <tr>
                    <td>
                    <span className="silver">
                      <i className="bi bi-trophy me-1"></i>
                    </span>
                    </td>
                    <td>
                    {ladder.slice(1, 2).map((data) => (
                      <span>{data.username}</span>
                    ))}
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <span className="bronze">
                      <i className="bi bi-trophy me-1"></i>
                    </span>
                  </td>
                  <td>
                  {ladder.slice(2, 3).map((data) => (
                      <span>{data.username}</span>
                    ))}
                  </td>
                </tr>
              </table>
              <br />
              <button class="btn btn-lg btn-outline-dark" type="button">
                  <Link to={`/play/${details.id}`} className='no-decoration'>
                    Jouer
                  </Link>
                </button>
            </div>
          </div>
        </>
      }
    </div>
  );
}
