import React, { useEffect } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    Aos.init({
      once : 'true',
    });
  }, []);
  return (
    <>
      <button className="btn-lancer-quizz">Lancer un Quizz !</button>
    </>
  )
}
