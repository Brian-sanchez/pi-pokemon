import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import Pokemons from "./Pokemons";

import style from "./styles/Home.module.css";

function Home() {
  return (
    <div className={style.container}>
      <div className={style.navBar}>
        <Header/>
      </div>

      <div className={style.main}>
        <div className={style.navBar}>
          <NavBar/>
        </div>

        <div className={style.min}>
          <Pokemons/>
        </div>

        <div className={style.footer}>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Home;
