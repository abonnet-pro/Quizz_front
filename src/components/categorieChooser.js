import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Wheel } from 'react-custom-roulette'
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {toast} from "react-toastify";
import randomColor from "randomcolor";

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
        toast.success(categories[categoriesChoosed].name)
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
        setMustSpin(true);
    }

    const handleGoClick = () => {
        toast.success(categories[categoriesChoosed].name)
        const idCategory = categories[categoriesChoosed].id
        console.log(idCategory)
        navigate("/play/" + categories[categoriesChoosed].id);
    }

    useEffect(loadCategorie, []);

    return (
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
                go ? <button className="go" onClick={handleGoClick}>GO</button> : <button className="spin" onClick={handleSpinClick}>SPIN</button>
            }

        </div>
    )
}