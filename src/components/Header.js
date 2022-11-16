import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import {contextPrototype} from "../services/usersContext.service";
import {admin} from "../services/role.service";

export default function Header({ score }) {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
  <Link to='/' className="navbar-brand"><img src={Logo} alt='Logo' /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <div className="navbar-nav me-auto">
        <div className="nav-item">
          <Link to='/' className="nav-link" href="#">Home</Link>
        </div>
        <div className="nav-item">
          <Link to='/categories' className="nav-link">Tous les quizz</Link>
        </div>
        <div className="nav-item">
          <Link to='/leaderboard' className="nav-link">Classement</Link>
        </div>
        <div className="nav-item">
          <Link to='/multiplayer' className="nav-link">Multiplayer</Link>
        </div>
        {
          admin() ? <div className="nav-item">
            <Link to='/questions' className="nav-link">Questions</Link>
          </div> : <></>
        }
        <div className="navbar-nav me-auto">
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profil</a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/my-account" className="dropdown-item" href="#">Mon compte</Link>
              <Link to='/my-results' className="dropdown-item" href="#">Mes résultats</Link>
              <div className="dropdown-divider"/>
              <Link to="/signout" className="dropdown-item" href="#">Déconnexion</Link>
            </div>
          </div>
        </div>
      </div>
      {
        contextPrototype.user ?
            <>
              <span className="score me-5"><i className="bi bi-star me-1"></i>{score?.score}</span>
              <span className="medaille or me-3"><i className="bi bi-trophy me-1"></i>{score?.nbMedailleOr}</span>
              <span className="medaille argent me-3"><i className="bi bi-trophy me-1"></i>{score?.nbMedailleArgent}</span>
              <span className="medaille bronze me-3"><i className="bi bi-trophy me-1"></i>{score?.nbMedailleBronze}</span>
            </>
            : <></>
      }
      <form className="d-flex">
        {
          contextPrototype.user ?
              <>
              </>
              :
              <>
                <Link to='/login' className="btn btn-outline-light me-sm-2" type="submit">Connexion</Link>
                <Link to='/signup' className="btn btn-secondary my-2 my-sm-0" type="submit">Inscription</Link>
              </>
        }
      </form>
    </div>
  </div>
</nav>
    </>
  )
}
