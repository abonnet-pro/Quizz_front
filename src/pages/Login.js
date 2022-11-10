import React from 'react'

export default function Login() {
  return (
    <>
    <div className="back-box-login">
    <div className='box-login'>
    <legend>Connexion</legend>
    <div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
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
