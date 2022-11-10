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
    <div className="card border-primary mb-3">
  <div className="card-header">Header</div>
  <div className="card-body">
    <h4 className="card-title">Primary card title</h4>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </>
  )
}
