import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, clearPokemonById } from "../actions/index";

import Loading from "./assets/images/loading2.gif";
import Footer from "./Footer";
import Header from "./Header";

import style from "./styles/PokemonDetail.module.css";

function PokemonDetail() {
    const dispatch = useDispatch();
    const pokemonByID = useSelector((state) => state.pokemonById);
    let { id } = useParams();

    useEffect(() => {
        dispatch(clearPokemonById());
        dispatch(getPokemonById(id));
    }, [dispatch, id]);

    if (pokemonByID.length === 0) {
        return (
            <div>
                <Header/>

                <div className={style.loadingContainer}>
                    <img src={Loading} alt="Loading" />
                </div>
                
                <Footer/>
            </div>
        );
    } else {
        return (
            <div className={style.bigContainer}>
                <Header />
                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.upper}>
                            <div>
                                <img
                                src={pokemonByID.image}
                                alt={pokemonByID.name}
                                className={style.pokemonImg}
                                />
                            </div>

                            <div className={style.stats}>
                                <div className={style.statsCard}>
                                    <h4>Health</h4>
                                    <p>{pokemonByID.hp}</p>
                                </div>

                                <div className={style.statsCard}>
                                    <h4>Speed</h4>
                                    <p>{pokemonByID.speed}</p>
                                </div>

                                <div className={style.statsCard}>
                                    <h4>Attack</h4>
                                    <p>{pokemonByID.attack}</p>
                                </div>

                                <div className={style.statsCard}>
                                    <h4>Defense</h4>
                                    <p>{pokemonByID.defense}</p>
                                </div>

                                <div className={style.statsCard}>
                                    <h4>Height</h4>
                                    <p>{pokemonByID.height}</p>
                                </div>

                                <div className={style.statsCard}>
                                    <h4>Weight</h4>
                                    <p>{pokemonByID.weight}</p>
                                </div>
                            </div>
                        </div>

                        <div className={style.cardGradient}>
                            <p className={style.pokemonName}>{pokemonByID.name}</p>
                            <p className={style.pokemonId}>ID: {pokemonByID.id}</p>

                            <div className={style.types}>
                                {
                                    pokemonByID.types && pokemonByID.types.map((type) => <p key={type.name} value={type.name}>{type.name}</p>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to="/home" className={style.goBack}>
                        <p>Go Back</p>
                    </Link>
                </div>

                <Footer/>
            </div>
        );
    };
};

export default PokemonDetail;