import React from 'react'
import axios from "axios";
import {API} from "../services/url.service";
import {token} from "../services/http.service";
import {handleError} from "../services/error.service";
import { useState } from 'react';
import BoxCategorie from '../components/BoxCategorie';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    
    axios.get(`${API}/categorie/all`, {
        headers: { 'Authorization' : 'Bearer ' + token() }
      })
          .then(res => {
            setCategories(res.data)
          })
          .catch(err => {
            handleError(err)
          })
  return (
    <div>
    {categories.map((info) => (
        <BoxCategorie
          details={info}
        />
    ))}
    </div>
  )
}
