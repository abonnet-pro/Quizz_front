import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setLocaleStorage, USER_KEY} from "../services/localStorage.service";
import {contextPrototype} from "../services/usersContext.service";
import {handleError} from "../services/error.service";
import {API} from "../services/url.service";

export default function Login() {

  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: form.username,
      password: form.password
    }

    axios.post(`${API}/signin`, user)
        .then((result) => {
          localStorage.clear();
          setLocaleStorage(USER_KEY, result.data)
          contextPrototype.setUser(result.data);
          navigate('/');
        })
        .catch(error => handleError(error));
  }

  const checkAuth = () => {
    if(contextPrototype.user) {
      navigate('/');
    }
  }

  useEffect(checkAuth, []);

  return (
    <>
      <div className="back-box-login">
        <div className='box-login'>
          <legend>Connexion</legend>
          <form onSubmit={ handleSubmit }>
            <div className="form-group">
              <label htmlFor="username" className="form-label mt-4">Username</label>
              <input type="text" className="form-control" name="username" aria-describedby="emailHelp"
                     placeholder="Enter nom d'utilisateur" value={ form.username } onChange={ handleChange } required/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label mt-4">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password"
                    value={ form.password } onChange={ handleChange } required/>
            </div>
            <br/>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">Se connecter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
