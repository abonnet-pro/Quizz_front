import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Resultat() {
    const { state } = useLocation()
    console.log(state)
  return (
    <div><h2> Votre résultat final est de { state.ActualScore }</h2></div>
  )
}
