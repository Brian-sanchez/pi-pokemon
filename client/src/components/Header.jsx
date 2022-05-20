import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../actions/index";

import Logo from "./assets/images/pokemon.svg";

import style from "./styles/Header.module.css";

function Header() {
    const dispatch = useDispatch();

    const goBackHome = () => {
        dispatch(clearState());
    };

    return (
        <div className={style.headerImage}>
            <div className={style.header}>
                <Link to="/home">
                    <img
                        src={Logo}
                        alt="Pokémon Logo"
                        className={style.logo}
                        onClick={goBackHome}
                    />
                </Link>

                <ul>
                    <Link to="/addpokemon" className={style.createButton}>
                        <p>Create Pokemon</p>
                    </Link>
                </ul>
            </div>
            
            <div className={style.line}></div>
        </div>
    );
};

export default Header;