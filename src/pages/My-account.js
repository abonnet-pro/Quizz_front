import React from 'react'
import { getLocalStorage } from '../services/localStorage.service'

export default function MyAccount() {
    const user = getLocalStorage("user")
    console.log(user)
  return (
    <div className="back-box-signup">
      <div className='box-signup'>
          <legend>Vos informations</legend>
          <form>
            <div className="form-group">
              <label htmlFor="username" className="form-label mt-4">Username</label>
              <input type="text" className="form-control" name="username" aria-describedby="emailHelp"
                     value={user.username} placeholder="Enter nom d'utilisateur" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label mt-4">Email</label>
              <input type="text" className="form-control" name="password" value={user.email} placeholder="Password"
                     required/>
            </div>
            <br/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">Confirmer</button>
            </div>
          </form>
        </div>
      </div>
  )
}
