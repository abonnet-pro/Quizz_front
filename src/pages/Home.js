import React, { useEffect } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";

export default function Home() {
  useEffect(() => {
    Aos.init({
      once : 'true',
    });
  }, []);
  return (
    <>
      <Link to="wheel" className="btn-lancer-quizz">Lancer un Quizz !</Link>
    </>
  )
}
