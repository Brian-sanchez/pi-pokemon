import React from "react";

import style from "./styles/Pokemon.module.css";

function Pokemon({ name, types, image }) {
  return (
    <div>
      <div className={style.card}>
        <img src={image} alt={name} className={style.pokemonImg}/>
        <div className={style.cardGradient}>
          <p className={style.pokemonName}>{name}</p>
          <div className={style.types}>
            {
              types && types.map((type) => <p key={type.name} value={type.name}>{type.name}</p>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
