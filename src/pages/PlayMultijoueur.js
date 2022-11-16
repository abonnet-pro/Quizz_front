import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {contextPrototype} from "../services/usersContext.service";
import right from "../assets/sounds/right-answer.mp3";
import wrong from "../assets/sounds/wrong-answer.mp3";
import quizz from "../assets/sounds/quizz.mp3";

export default function PlayMultijoueur({ setHistorique, categorieId, setScore, stompClient, socket }) {

    const [questions, setQuestions] = useState([]);
    const [idArray, setidArray] = useState(0);
    const [bonneReponse, setBonneReponse] = useState(null);
    const [reponseSelected, setReponseSelected] = useState(null);
    const [repondant, setRepondant] = useState(null);

    const [milliseconds, setMilliseconds] = useState(0);
    const [isActive, setIsActive] = useState(true);


    const [quizzSoundBackground, setAudio] = useState( new Audio(quizz) );

    let idArrayCount = 0;
    let historique = [];
    let questionCache = [];

    const navigate = useNavigate();

    const handleTimeout = () => {
        const data = {
            userId: contextPrototype.user.id,
            reponse: ""
        }

        stompClient.send(`/app/multiplayer/question/${questions[idArray]?.id}/timeout`, JSON.stringify(data));
    }

    const handleClickReponse = async (reponse, index) => {

        if(reponseSelected != null) {
            return;
        }

        const data = {
            userId: contextPrototype.user.id,
            reponse: reponse
        }

        stompClient.send(`/app/multiplayer/question/${questions[idArray]?.id}/valide`, JSON.stringify(data));
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const init = () => {
        stompClient.subscribe(`/questions/${contextPrototype.user.id}`, OnQuestionsReceived);
        stompClient.subscribe(`/questions/result/${contextPrototype.user.username}`, OnResultReceived)
        stompClient.subscribe(`/questions/timeout/${contextPrototype.user.username}`, OnResultReceived)
        stompClient.send(`/app/quizz/categorie/${categorieId}/user/${contextPrototype.user.id}`);
        quizzSoundBackground.play();
    }

    const OnResultReceived = async (payload) => {
        let body = JSON.parse(payload.body)
        setIsActive(false);
        setReponseSelected(body.reponseSender)
        body.success ? new Audio(right).play() : new Audio(wrong).play()
        setBonneReponse(body.bonneReponse)
        setRepondant(body.repondant)
        historique.push({'question': questionCache[idArrayCount]?.description, 'reponse': body.reponseSender, 'bonneReponse': body.bonneReponse, 'username':  body.repondant, 'statut': body.success});
        setScore(body.score);
        await timeout(1000);
        setReponseSelected(null);
        idArrayCount++;
        setidArray(idArrayCount);
        setBonneReponse(null);
        setIsActive(true);
        setRepondant(null);
        setMilliseconds(0);

        if(idArrayCount === 10) {
            quizzSoundBackground.pause();
            setHistorique(historique);
            socket.close();
            navigate(`/resultat/${categorieId}`);
        }
    }

    const OnQuestionsReceived = (payload) => {
        let body = JSON.parse(payload.body)
        setQuestions(body);
        questionCache = body;
    }

    const interval = () => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setMilliseconds(milliseconds => milliseconds + 200);
            }, 200);
            if(milliseconds === 10000) {
                handleTimeout();
            }
        } else if (!isActive && milliseconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }

    useEffect(init, []);
    useEffect(interval, [isActive, milliseconds]);

    function getBackground(reponse, index) {
        if(!bonneReponse) {
            return "";
        }

        if(reponse === bonneReponse) {
            return 'bg-success win';
        }

        if(reponse === reponseSelected && reponse !== bonneReponse) {
            return 'bg-danger lose';
        }
    }

    return (
        <>
            <h1 className="leader-title"> Question {idArray + 1}</h1>
            <div className="play-box">
                <h3>{questions[idArray]?.description}</h3>
            </div>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-timer" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width : `${100-(milliseconds/100)}%`}}/>
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-center">
                    <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse1, 1)} onClick={ () => handleClickReponse(questions[idArray]?.reponse1, 1) }><label className="m-auto">{questions[idArray]?.reponse1}</label>{repondant && reponseSelected === questions[idArray]?.reponse1 ? <span className="bulle">{repondant}</span> : <></> }</div>
                    <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse2, 2)} onClick={ () => handleClickReponse(questions[idArray]?.reponse2, 2) }><label className="m-auto">{questions[idArray]?.reponse2}</label>{repondant && reponseSelected === questions[idArray]?.reponse2 ? <span className="bulle">{repondant}</span> : <></> }</div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse3, 3)} onClick={ () => handleClickReponse(questions[idArray]?.reponse3, 3) }><label className="m-auto">{questions[idArray]?.reponse3}</label>{repondant && reponseSelected === questions[idArray]?.reponse3 ? <span className="bulle">{repondant}</span> : <></> }</div>
                    <div className={"card reponse m-3 pointer " + getBackground(questions[idArray]?.reponse4, 4)} onClick={ () => handleClickReponse(questions[idArray]?.reponse4, 4) }><label className="m-auto">{questions[idArray]?.reponse4}</label>{repondant && reponseSelected === questions[idArray]?.reponse4 ? <span className="bulle">{repondant}</span> : <></> }</div>
                </div>
            </div>
        </>
    );
}
