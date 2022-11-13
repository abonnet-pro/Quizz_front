import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

export default function CategorieQuestions () {

    const navigate = useNavigate();
    const params = useParams();
    const [questions, setQuestions] = useState([]);
    const [idQuestionToDelete, setIdQuestionToDelete] = useState(null);
    const [categorie, setCategorie] = useState({});
    const [showModal, setShowModal] = useState(false);

    const loadQuestions = () => {
        axios.get(`${API}/categorie/${params.id}`, headerToken)
            .then(res => {
                setCategorie(res.data)
            })
            .catch(err => {
                handleError(err)
            })

        axios.get(`${API}/question/categorie/${params.id}`, headerToken)
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => {
                handleError(err)
            })
    }

    const handleClickNew = () => {
        navigate(`/categorie/${categorie.id}/question/form`);
    }

    const handleClickDelete = (id) => {
        setIdQuestionToDelete(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDelete = () => {
        axios.delete(`${API}/question/${idQuestionToDelete}`, headerToken)
            .then(_ => {
                toast.success("Suppréssion effectuée");
                loadQuestions();
                setShowModal(false);
            })
            .catch(err => {
                handleError(err)
            })
    }

    useEffect(loadQuestions, []);

    return (
        <>
            <br />
            <div className="d-flex justify-content-between">
                <h1 className='leader-title'>{ categorie.name }</h1>
                <button className="go" onClick={handleClickNew}>Nouvelle question</button>
            </div>
            <br />

            <Modal className="my-modal" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Etes vous sur de vouloir supprimer la question ? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                questions.length > 0 ?
                    <table className="table table-hover">
                        <thead>
                        {
                            questions.map((question, index) => {
                                return(
                                    <tr className="table-light pointer question">
                                        <th scope="row">#{index+1}</th>
                                        <td><Link to={`/categorie/${categorie.id}/question/form`} state={question} className="description">{question.description}</Link></td>
                                        <td>{question.reponse1} / {question.reponse2} / {question.reponse3} / {question.reponse4}</td>
                                        <td className="trash" onClick={() => handleClickDelete(question.id)}><i className="bi bi-trash"></i></td>
                                    </tr>
                                )
                            })
                        }
                        </thead>
                    </table> :
                    <>
                        <br />
                        <h3 className='leader-title'>Aucun questions</h3>
                        <br />
                    </>
            }
        </>
    )
}