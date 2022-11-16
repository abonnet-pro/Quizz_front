import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Wheel } from 'react-custom-roulette'
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import randomColor from "randomcolor";
import loterie from "../assets/sounds/loterie.mp3"

export default function CategorieChooser() {

    const [categories, setCategories] = useState([]);
    const [categoriesChoosed, setCategorieChoosed] = useState(0);
    const [datas, setDatas] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [go, setGo] = useState(false);

    const navigate = useNavigate();

    const loadCategorie = () => {
        axios.get(`${API}/categorie/available`, headerToken)
            .then(res => {
                setCategories(res.data)
                buildDatas(res.data)
                chooseRandomCategorie(res.data.length);
            })
            .catch(err => {
                handleError(err)
            })
    }

    const categorieChoosed = () => {
        setGo(true);
    }

    function buildDatas(categories) {
        const data = []

        for(let categorie of categories) {
            data.push({
                option: categorie.name,
                style: { backgroundColor: randomColor() }
            })
        }

        setDatas(data);
    }

    function chooseRandomCategorie(length) {
        setCategorieChoosed(Math.floor(Math.random() * length));
    }

    const handleSpinClick = () => {
        new Audio(loterie).play()
        setMustSpin(true);
    }

    const handleGoClick = () => {
        navigate("/play/" + categories[categoriesChoosed].id);
    }

    useEffect(loadCategorie, []);

    return (
        <div className="d-flex justify-content-between">
            <div className="wheel">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={categoriesChoosed}
                    data={datas}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']}
                    spinDuration={0.4}
                    onStopSpinning={ categorieChoosed }
                />

                {
                    go ? <button className="go mt-2" onClick={handleGoClick}>GO</button> : <button className="spin mt-2" onClick={handleSpinClick}>SPIN</button>
                }
            </div>
            <div className="regle h-auto">
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
        </div>

    )
}
