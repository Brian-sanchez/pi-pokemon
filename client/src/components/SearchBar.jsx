import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions/index";

import style from "./styles/SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    //Validaciones
    if (search.length === 0) {
      e.preventDefault();
      alert("No sea a escrito nada");      
    } else if (search.match(/[|\\/~^:.,;?!&%$@*+_-]/)) {
      e.preventDefault();
      alert("No escribir caracteres especiales");
    } else if (search > 0) {
      e.preventDefault();
      alert("No escribir numeros");
    } else {
      e.preventDefault();
      dispatch(getPokemonByName(search));
      setSearch("");
    }
  };

  return (
    <div className={style.container}>
      <form>
        <div className={style.form}>
          <input
            type="text"
            value={search}
            placeholder="Search for a Pokemon"
            onChange={handleChange}
          />
          
          <button onClick={handleSubmit}>Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;