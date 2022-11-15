import React, {useEffect} from 'react'
import axios from "axios";
import {API} from "../services/url.service";
import {token} from "../services/http.service";
import {handleError} from "../services/error.service";
import { useState } from 'react';
import BoxCategorie from '../components/BoxCategorie';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    const loadCategories = () => {
        axios.get(`${API}/categorie/available`, {
            headers: { 'Authorization' : 'Bearer ' + token() }
        })
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                handleError(err)
            });
    }

    useEffect(loadCategories, []);

  return (
    <>
    <div className='row'>
    {categories.map((info) => (
        <BoxCategorie
          details={info}
        />
    ))}
    </div>
    <div className="regle mx-auto">
                <h1 className="title mt-4 mb-4">Règles du Quizz</h1>
                <ul className="lignes ms-3">
                    <li className="m-2">Lancement d'une catégorie aléatoire</li>
                    <li className="m-2">Une bonne réponse : +1 Points !</li>
                    <li className="m-2">Une mauvaise réponse : -1 Points !</li>
                    <li className="m-2">Résultat du Quizz 10/10 : <i className="or bi bi-trophy me-1"/></li>
                    <li className="m-2">Résultat du Quizz minimum 7/10 : <i className="argent bi bi-trophy me-1"/></li>
                    <li className="m-2">Résultat du Quizz minimum 5/10 : <i className="bronze bi bi-trophy me-1"/></li>
                    <li className="m-2">Bonne chance !</li>
                </ul>
            </div>
    </>
    
  )
}
