import React from "react";

export default function BoxCategorie({ details }) {
  return (
    <div class="card text-white bg-primary mb-3">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h4 class="card-title">{details.name}</h4>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
}
