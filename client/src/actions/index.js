import axios from "axios";

// Actions Get
export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons`);
      dispatch({ type: "GET_ALL_POKEMONS", payload: response.data });
    } catch (error) {
      console.log("Get all pokemons:", error);
    }
  };
};

export function getPokemonTypes() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types");
      dispatch({ type: "GET_POKEMON_TYPES", payload: response.data });
    } catch (error) {
      console.log("Get pokemon types:", error);
    }
  };
};

export function getPokemonByName(payload) {
  return {
    type: "GET_POKEMON_BY_NAME",
    payload: payload,
  };
};

export function pokeNotFoundReset() {
  return {
    type: "POKE_NOT_FOUND_RESET"
  };
}

export function getPokemonById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({ type: "GET_POKEMON_BY_ID", payload: response.data });
    } catch (error) {
      alert("No existe pokemon con ese ID");
      dispatch({ type: "GET_POKEMON_BY_ID", payload: null });
    }
  };
};

// Actions Clear
export function clearPokemonById() {
  return {
    type: "CLEAR_POKEMON_BY_ID",
  };
};

export function clearState() {
  return {
    type: "CLEAR_STATE",
  };
};

// Action POST
export function addPokemon(pokemon) {
  return async function (dispatch) {
    try {
      dispatch({ type: "ADD_POKEMON", payload: true });
      const response = await axios.post("http://localhost:3001/pokemons", pokemon);
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADD_POKEMON", payload: false });
    }
  };
};

// Actions Filter
export function filterByType(type) {
  return {
    type: "FILTER_BY_TYPE",
    payload: type,
  };
};

export function filterByCreator(payload) {
  return {
    type: "FILTER_BY_CREATOR",
    payload: payload,
  };
};

// Actions Order
export function orderPokemon(type) {
  if (type === "asc") {
    return {
      type: "ORDER_ASCENDING",
    };
  };

  if (type === "desc") {
    return {
      type: "ORDER_DESCENDING",
    };
  };

  if (type === "less") {
    return {
      type: "ORDER_ATTACK_DESCENDING",
    };
  };

  if (type === "more") {
    return {
      type: "ORDER_ATTACK_ASCENDING",
    };
  };
};
