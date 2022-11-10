import React from 'react'

export default function Signup() {
  return (
    <>
    <div className="back-box-signup">
    <div className='box-signup'>
    <legend>Inscription</legend>
    <div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Nom d'utilisateur</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" class="form-label mt-4">Mot de passe</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" class="form-label mt-4">Confirmez votre mot de passe</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" />
    </div>
    <br />
    <div class="form-group">
    <button type="submit" class="btn btn-primary w-100">Se connecter</button>
    </div>
    </div>
    </div>
    </>
  )
}
