import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {toast} from "react-toastify";

export default function QuestionForm() {

    const navigate = useNavigate();
    const params = useParams();
    const [form, setForm] = useState({categorieId: 0, description:'', reponse1:'', reponse2:'', reponse3:'', reponse4:''})
    const [categorie, setCategorie] = useState({});
    const { state }  = useLocation();

    const init = () => {
        if(state) {
            setForm({
                description: state.description,
                reponse1: state.reponse1,
                reponse2: state.reponse2,
                reponse3: state.reponse3,
                reponse4: state.reponse4
            })
        }

        axios.get(`${API}/categorie/${params.id}`, headerToken)
            .then(res => {
                setCategorie(res.data)
            })
            .catch(err => {
                handleError(err)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(state != null) {
            updateQuestion();
        } else {
            createQuestion();
        }
    }

    function createQuestion() {
        axios.post(`${API}/question`, {...form, categorieId: categorie.id}, headerToken)
            .then((result) => {
                toast.success("Question créée");
                navigate(`/categorie/${categorie.id}/questions`)
            })
            .catch(error => handleError(error));
    }

    function updateQuestion() {
        axios.put(`${API}/question/${state.id}`, {...form, categorieId: categorie.id}, headerToken)
            .then((result) => {
                toast.success("Modification effectuée");
                navigate(`/categorie/${categorie.id}/questions`)
            })
            .catch(error => handleError(error));
    }

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    function formValid() {
        return form.description !== '' && form.reponse1 !== '' && form.reponse2 !== '' && form.reponse3 !== '' && form.reponse4 !== '';
    }

    useEffect(init, []);

    return(
        <>
            <br />
            <h1 className='leader-title'>Question</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-4 text-white">Description</label>
                    <input type="text" className="form-control" name="description" aria-describedby="emailHelp"
                           placeholder="Entrer la question" value={ form.description } onChange={ handleChange } required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-4 text-white">Bonne réponse</label>
                    <input type="text" className="form-control" name="reponse1" aria-describedby="emailHelp"
                           placeholder="Entrer la bonne réponse" value={ form.reponse1 } onChange={ handleChange } required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-4 text-white">Autre réponse</label>
                    <input type="text" className="form-control" name="reponse2" aria-describedby="emailHelp"
                           placeholder="Entrer une mauvaise réponse" value={ form.reponse2 } onChange={ handleChange } required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-4 text-white">Autre réponse</label>
                    <input type="text" className="form-control" name="reponse3" aria-describedby="emailHelp"
                           placeholder="Entrer une mauvaise réponse" value={ form.reponse3 } onChange={ handleChange } required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-4 text-white">Autre réponse</label>
                    <input type="text" className="form-control" name="reponse4" aria-describedby="emailHelp"
                           placeholder="Entrer une mauvaise réponse" value={ form.reponse4 } onChange={ handleChange } required/>
                </div>
                <br/>

                <button className={"go " +  (!formValid() ? "disabled" : "")} type="submit">Valider</button>
            </form>
        </>
    )
}