import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

export default function Header() {
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
          <Link to='/quizz' className="nav-link">Tous les quizz</Link>
        </div>
        <div className="nav-item">
          <Link to='/leaderboard' className="nav-link">Classement</Link>
        </div>
      </div>
      <form className="d-flex">
      <div className="navbar-nav me-auto">
      <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profil</Link>
          <div className="dropdown-menu">
            <Link to="/my-account" className="dropdown-item" href="#">Mon compte</Link>
            <Link to='/my-results' className="dropdown-item" href="#">Mes résultats</Link>
            <div className="dropdown-divider"></div>
            <Link to="signout" className="dropdown-item" href="#">Déconnexion</Link>
          </div>
        </div>
        </div>
        <Link to='/login' className="btn btn-outline-light me-sm-2" type="submit">Connexion</Link>
        <Link to='/signup' className="btn btn-secondary my-2 my-sm-0" type="submit">Inscription</Link>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}
