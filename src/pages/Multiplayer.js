import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {API} from "../services/url.service";
import {contextPrototype} from "../services/usersContext.service";
import {token} from "../services/http.service";
import { Rings } from 'react-loader-spinner'

import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import PlayMultijoueur from "./PlayMultijoueur";
import search from "../assets/sounds/search.mp3";
import countDown from "../assets/sounds/count-down.mp3";

export default function Multiplayer({ historique, setHistorique, setScore }) {

    const [loadGame, setLoadGame] = useState(false);
    const [gameFound, setGameFound] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [socketClient, setSocketClient] = useState(null);
    const [joueurs, setJoueurs] = useState([]);
    const [categorieChoosed, setCategorieChoosed] = useState(null)
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [searchSound, setSearchSound] = useState(new Audio(search));

    let stomp = null;
    let joueursCache = [];

    const init = () => {
    }

    const onError = () => {
        // toast.error("Connexion interrompue");
    }

    const onMessageReceived= (payload) => {
        let body = JSON.parse(payload.body)
        if(body.length > 1) {
            joueursCache.push(body[0]);
            joueursCache.push(body[1]);
            setJoueurs(joueursCache);
            stomp.send(`/app/find/categorie`);
        }
    }

    const onCategorieFounded = (payload) => {
        let body = JSON.parse(payload.body)
        setCategorieChoosed(body)
        searchSound.pause();
        setLoadGame(false);
        setIsActive(true);
        new Audio(countDown).play();
    }

    const handleClick = async () => {
        let socket = new SockJS(API + '/ws', null, {headers: {Authorization: "Bearer " + token()}});
        stomp = webstomp.over(socket);
        stomp.connect({Authorization: `Bearer ${token()}`}, () => {
            stomp.subscribe('/queue', onMessageReceived);
            stomp.subscribe('/categorie/found', onCategorieFounded);
            stomp.send(`/app/search`, contextPrototype.user.username);
            setLoadGame(true);
            setStompClient(stomp);
            setSocketClient(socket);
            searchSound.play();
        }, onError);
    }

    const handleStartGame = () => {
        setGameFound(true);
    }

    const interval = () => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            if(seconds === 5) {
                handleStartGame();
                clearInterval(interval);
            }
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }

    useEffect(init, []);
    useEffect(interval, [isActive, seconds]);

    return(
        <>
            {
                gameFound ? <PlayMultijoueur historique={ historique } setHistorique={ setHistorique } categorieId={ categorieChoosed.id } setScore={ setScore } stompClient={ stompClient } socket={ socketClient }/>
                    :
                    <div className="d-flex justify-content-between">
                        {
                            joueurs?.length > 0 ?
                                <div className="game-found">
                                    <h1 className="text-white fs-50 mb-5">Une partie a été trouvé !</h1>
                                    <h3 className="text-white fs-25">Lancement de la partie dans la categorie <label className="text-danger fw-bold">{categorieChoosed?.name}</label></h3>
                                    <h3 className="text-white fs-25">La partie opposera <label className="text-danger fw-bold">{joueurs[0]}</label> et <label className="text-danger fw-bold">{joueurs[1]}</label></h3>
                                    <h5 className="text-white fs-25">Lancement dans {5 - seconds}</h5>
                                </div>
                                :
                            loadGame ?
                                <div className="recherche">
                                    <Rings
                                        height="200"
                                        width="200"
                                        radius="9"
                                        color="green"
                                        ariaLabel="loading"
                                        wrapperStyle
                                        wrapperClass
                                    />
                                    <h5 className="text-white">Recherche d'un adversaire en cours ...</h5>
                                </div>
                                 :
                                <button className="find" onClick={handleClick}>Trouver une partie</button>
                        }
                        <div className="regle h-auto">
                            <h1 className="title mt-4 mb-4">Règles du Quizz</h1>
                            <ul className="lignes ms-3">
                                <li className="m-2">Lancement d'une catégorie aléatoire</li>
                                <li className="m-2">Match en 1v1</li>
                                <li className="m-2">Une bonne réponse : +1 Points !</li>
                                <li className="m-2">Une mauvaise réponse : -1 Points !</li>
                                <li className="m-2">Une bonne réponse adverse: -1 Points !</li>
                                <li className="m-2">Une mauvaise réponse adverse: +1 Points !</li>
                                <li className="m-2">Résultat du Quizz 10/10 : <i className="or bi bi-trophy me-1"/></li>
                                <li className="m-2">Résultat du Quizz minimum 7/10 : <i className="argent bi bi-trophy me-1"/></li>
                                <li className="m-2">Résultat du Quizz minimum 5/10 : <i className="bronze bi bi-trophy me-1"/></li>
                                <li className="m-2">Bonne chance !</li>
                            </ul>
                        </div>
                    </div>
            }
        </>
    )
}
