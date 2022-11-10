import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API} from "../services/url.service";
import {setLocaleStorage, USER_KEY} from "../services/localStorage.service";
import {contextPrototype} from "../services/usersContext.service";
import {handleError} from "../services/error.service";
import {toast} from "react-toastify";

export default function Signup() {

  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
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
      password: form.password,
      email: form.email
    }

    axios.post(`${API}/signup`, user)
        .then((result) => {
          localStorage.clear();
          setLocaleStorage(USER_KEY, result.data)
          contextPrototype.setUser(result.data);
          navigate('/');
          toast.success("Inscription validée")
        })
        .catch(error => handleError(error));
  }

  function formValid() {
    return form.email !== '' && form.username !== '' && form.password !== '' && form.password === form.confirm
  }

  return (
    <>
    <div className="back-box-signup">
      <div className='box-signup'>
        <legend>Inscription</legend>
        <form onSubmit={ handleSubmit }>
          <div className="form-group">
            <label htmlFor="username" className="form-label mt-4">Nom d'utilisateur</label>
            <input type="text" className="form-control" name="username" aria-describedby="emailHelp"
                   placeholder="Username" value={ form.username } onChange={ handleChange }/>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp"
                   placeholder="Email" value={ form.email } onChange={ handleChange }/>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label mt-4">Mot de passe</label>
            <input type="password" className="form-control" name="password" placeholder="Mot de passe" value={ form.password } onChange={ handleChange }/>
          </div>
          <div className="form-group">
            <label htmlFor="confirm" className="form-label mt-4">Confirmez votre mot de passe</label>
            <input type="password" className="form-control" name="confirm" placeholder="Mot de passe" value={ form.confirm } onChange={ handleChange }/>
          </div>
          <br/>
          <div className="form-group">
            <button type="submit" className={"btn btn-primary w-100 " + (!formValid() ? "disabled" : "")}>Se connecter</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
