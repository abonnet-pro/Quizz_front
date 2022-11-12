import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Questions () {

    const [categoriesQuestions, setCategoriesQuestions] = useState([])
    const navigate = useNavigate();

    const loadCategorie = () => {
        axios.get(`${API}/categorie/questions`, headerToken)
            .then(res => {
                setCategoriesQuestions(res.data)
            })
            .catch(err => {
                handleError(err)
            })
    }

    const handleClickCategorie = (id) => {
        navigate(`/categorie/${id}/questions`);
    }

    useEffect(loadCategorie, []);

    return (
        <>
            {
                categoriesQuestions.map(categorie => {
                    return (
                        <div className="card m-2 pointer" onClick={ () => handleClickCategorie(categorie.id) }>
                            <div className="card-body">
                                <h4 className="card-title">{ categorie.name }</h4>
                                <h6 className="card-subtitle mb-2 text-muted">{ categorie.nbQuestions} questions</h6>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}