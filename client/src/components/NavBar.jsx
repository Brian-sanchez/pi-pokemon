import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonTypes, orderPokemon, filterByType, filterByCreator, clearState, getAllPokemons } from "../actions/index";

import SearchBar from "./SearchBar";

import style from "./styles/NavBar.module.css";

function NavBar() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.pokemonTypes);

    const [selectType, setSelectType] = useState("");
    const [selectCreator, setSelectCreator] = useState("");
    const [selectOrder, setSelectOrder] = useState("");

    useEffect(() => {
        dispatch(getPokemonTypes());
    }, [dispatch]);

    const order = (e) => {
        setSelectOrder(e.target.value);
        dispatch(orderPokemon(e.target.value));
    };

    const filterType = (e) => {
        setSelectType(e.target.value);
        if (e.target.value === "type") return dispatch(clearState());
        dispatch(filterByType(e.target.value));
    };

    const filterCreator = (e) => {
        setSelectCreator(e.target.value);
        if (e.target.value === "all") return dispatch(clearState());
        dispatch(filterByCreator(e.target.value));
    };

    const filtersRefresh1 = () => {
        setSelectCreator("");
        setSelectOrder("");
    };

    const disabledOption1 = () => {
        document.getElementById("orderByAlphabetical").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAttack").options[0].removeAttribute("disabled");
    }

    const disabledOption2 = () => {
        document.getElementById("orderByAttack").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
    }

    const disabledOption3 = () => {
        document.getElementById("filterByType").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByAttack").options[0].removeAttribute("disabled");
    }

    const disabledOption4 = () => {
        document.getElementById("filterBySource").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByAttack").options[0].removeAttribute("disabled");
    }

    const refresh = () => {
        setSelectType("");
        setSelectCreator("");
        setSelectOrder("");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByAttack").options[0].removeAttribute("disabled");
        document.getElementById("filterByType").options[0].removeAttribute("disabled");
        document.getElementById("filterBySource").options[0].removeAttribute("disabled");
        dispatch(getAllPokemons());
    };

        return (
            <div className={style.bigContainer}>
                <div className={style.searchBar}>
                    <SearchBar/>
                </div>

                <div className={style.container}>
                    <div className={style.filters}>
                        <p>Order by</p>
                        <select id="orderByAlphabetical" onChange={order} value={selectOrder} onClick={disabledOption1}>
                            <option value="alph">Alphabetical</option>
                            <option value="asc">Ascending (A-Z)</option>
                            <option value="desc">Descending (Z-A)</option>
                        </select>

                        <select id="orderByAttack" onChange={order} value={selectOrder} onClick={disabledOption2}>
                            <option value="attack">Attack</option>
                            <option value="less">Less (-)</option>
                            <option value="more">More (+)</option>
                        </select>
                    </div>

                    <div className={style.filters}>
                        <p>Filter by</p>
                        <select id="filterByType" onChange={filterType} value={selectType} onClick={filtersRefresh1 && disabledOption3}>
                            <option>Type</option>
                            <option value="type">All Types</option>
                            {
                                types && types
                                .sort((a, b) => {
                                    if (a.name < b.name) return -1;
                                    if (a.name > b.name) return 1;
                                    return 0;
                                })

                                .map((type) => {
                                    return (
                                        <option value={type.name} key={type.id}>
                                            {type.name}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <select id="filterBySource" onChange={filterCreator} value={selectCreator} onClick={disabledOption4}>
                            <option>Source</option>
                            <option value="all">All</option>
                            <option value="false">Api</option>
                            <option value="true">Db</option>
                        </select>
                    </div>

                    <div className={style.buttons}>
                        <button className={style.buttonClear} onClick={refresh}>Refresh</button>
                    </div>
                </div>
            </div>
        );
}


export default NavBar;