import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons, getPokemonTypes } from "../actions/index";

import { Link } from "react-router-dom";
import video from "./assets/videos/pokemon-background.mp4";

import style from "./styles/LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getPokemonTypes());
}, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.button}>
        <Link to="/home" className={style.title}>
          <h1>Welcome</h1>
        </Link>
      </div>

      <video className={style.background} muted autoPlay loop src={video} />
    </div>
  );
};