import axios from "axios";
import {API} from "../services/url.service";
import {headerToken} from "../services/http.service";
import {handleError} from "../services/error.service";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

export default function Questions () {

    const [categoriesQuestions, setCategoriesQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [idCategorieToDelete, setIdCategorieToDelete] = useState(null);
    const [newCategorie, setNewCategorie] = useState("");
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

    const handleClickDelete = (id) => {
        setIdCategorieToDelete(id);
        setShowModal(true);
    }

    const handleClickCategorie = (id) => {
        navigate(`/categorie/${id}/questions`);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        setNewCategorie("");
    }

    const handleDelete = () => {
        axios.delete(`${API}/categorie/${idCategorieToDelete}`, headerToken)
            .then(_ => {
                toast.success("Suppréssion effectuée");
                loadCategorie();
                setShowModal(false);
            })
            .catch(err => {
                handleError(err)
            })
    }

    const handleClickNew = () => {
        setShowModalCreate(true);
    }

    const handleCreate = () => {
        axios.post(`${API}/categorie`, newCategorie, headerToken)
            .then(_ => {
                console.log(newCategorie)
                toast.success("Création effectuée");
                loadCategorie();
                setShowModalCreate(false);
                setNewCategorie("");
            })
            .catch(err => {
                handleError(err)
            })
    }

    const handleChange = (event) => {
        const value = event.target.value
        setNewCategorie(value);
    }

    useEffect(loadCategorie, []);

    return (
        <>
            <br />
            <div className="d-flex justify-content-between">
                <h1 className='leader-title'>Catégories</h1>
                <button className="go" onClick={handleClickNew}>Nouvelle catégorie</button>
            </div>
            <br />

            <Modal className="my-modal" show={showModal} onHide={handleCloseModalCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Etes vous sur de vouloir supprimer la categorie ? Toutes les questions liés seront également supprimés </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="my-modal" show={showModalCreate} onHide={handleCloseModalCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Création</Modal.Title>
                </Modal.Header>
                <Modal.Body>Veuillez renseigner le nom de la categorie </Modal.Body>
                <input autoFocus={true} className="m-3" type="text" placeholder="Nom de la catégorie" name="newCategorie" value={ newCategorie } onChange={ handleChange }/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalCreate}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                categoriesQuestions.map(categorie => {
                    return (
                        <>
                            <div className="card m-2 pointer" >
                                <div className="d-flex justify-content-between">
                                    <div  className="card-body" onClick={ () => handleClickCategorie(categorie.id) }>
                                        <h4 className="card-title">{ categorie.name }</h4>
                                        <h6 className="card-subtitle mb-2 text-muted">{ categorie.nbQuestions} questions</h6>
                                    </div>
                                    <div className="delete-categorie" onClick={() => handleClickDelete(categorie.id)}><i className="bi bi-trash"></i></div>
                                </div>

                            </div>
                        </>
                    )
                })
            }
        </>
    )
}