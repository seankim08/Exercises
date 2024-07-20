import React from 'react';

function Pokecard({ id, name, type, base_experience }) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="Pokecard">
      <h3>{name}</h3>
      <img src={imgSrc} alt={name} />
      <div>Type: {type}</div>
      <div>EXP: {base_experience}</div>
    </div>
  );
}

export default Pokecard;