import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearState } from "../actions/index";
import Loading from "./assets/images/loading1.gif";
import PikachuNotFound from "./assets/images/404.svg";
import Pokemon from "./Pokemon";

import style from "./styles/Pokemons.module.css";

function Pokemons() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12);
    const indexOfLastPost = currentPage * pokemonsPerPage; // 1: 1 * 9 , 2: 18
    const indexOfFirstPost = indexOfLastPost - pokemonsPerPage; // 1: 9 - 9 2: 18-9
    const totalPokemons = useSelector((state) => state.filteredPokemons);
    const totalPages = Math.ceil(totalPokemons.length / pokemonsPerPage);
    const showPokemons = useSelector((state) => state.filteredPokemons ? state.filteredPokemons.slice(indexOfFirstPost, indexOfLastPost) : false);
    const error404 = useSelector((state) => state.pokeNotFound);

    // Pagination
    const previousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const nextPage = () => {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (currentPage > totalPages) previousPage();

    const scrollToUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Clear State for Go Back button
    const clearHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(clearState());
    };

    if (error404) {
        window.scrollTo({ top: 1100, behavior: "smooth" });
        return (
            <div className={style.notFoundContainer}>
                <img src={PikachuNotFound} alt="Not Found"/>
                <h1>Pokemon not found with this name...</h1>

                <div className={style.goBack}>
                    <Link to="/home" style={{ textDecoration: "none" }} onClick={clearHome}>
                        <p>Go Back</p>
                    </Link>
                </div>
            </div>
        );
    } else if (!showPokemons) {
        window.scrollTo({ top: 1100, behavior: "smooth" });
        return (
            <div className={style.notFoundContainer}>
                <img src={PikachuNotFound} alt="Not Found Pokemon"/>
                <h1>Nothing was found...</h1>

                <div className={style.goBack}>
                    <Link to="/home" style={{ textDecoration: "none" }} onClick={clearHome}>
                        <p>Go Back</p>
                    </Link>
                </div>
            </div>
        );
    } else if (showPokemons.length) {
        return (
            <div className={style.prueba}>
                <div className={style.pokemons}>
                    {
                        showPokemons && showPokemons.map((p) => (
                            <Link to={`/pokemon/${p.id}`} style={{ textDecoration: "none" }} key={p.id} onClick={scrollToUp}>
                                <Pokemon
                                name={p.name}
                                types={p.types}
                                image={p.image}
                                key={p.id}
                                />
                            </Link>
                        ))
                    }
                </div>

                <div className={style.buttons}>
                    <button onClick={previousPage}> 🡸 </button>
                        <p>{currentPage} / {totalPages}</p>
                    <button onClick={nextPage}> 🡺 </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={style.loadingContainer}>
                <img src={Loading} alt="Loading"/>
            </div>
        );
    }
};

export default Pokemons;