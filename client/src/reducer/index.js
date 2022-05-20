const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    pokemonDB: [],
    pokemonById: [],
    pokemonTypes: [],
    addedPokemon: false,
    pokeNotFound: false,
};
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_POKEMON":
            return {
                ...state,
                addedPokemon: action.payload,
            };
                                    
        case "CLEAR_POKEMON_BY_ID":
            return {
                ...state,
                pokemonById: [],
            };

        case "CLEAR_STATE":
            return {
                ...state,
                filteredPokemons: state.allPokemons,
                pokeNotFound: false
            };

        case "FILTER_BY_TYPE":
            // Momento epico
            const typeFiltered = state.pokemonDB.filter((p) => {
                return p.types.some((type) => type.name === action.payload);
            });
            //

            const typeFiltered2 = state.allPokemons.filter((p) => {
                return p.types.some((type) => type.name === action.payload);
            });

            if (typeFiltered.length) {
                return {
                    ...state,
                    filter: true,
                    filteredPokemons: typeFiltered || typeFiltered2 // Gracias por existir ||
                };
            } else {
                return {
                    ...state,
                    filteredPokemons: false,
                };
            };

        case "FILTER_BY_CREATOR":
            const filteredCreator = state.allPokemons.filter((p) => {
                return p.created.toString() === action.payload;
            });

            if (filteredCreator.length) {
                return {
                    ...state,
                    pokemonDB: filteredCreator,
                    filteredPokemons: filteredCreator
                };
            } else {
                return {
                    ...state,
                    pokemonDB: false
                };
            };

        case "GET_ALL_POKEMONS":
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
            };

        case "GET_POKEMON_BY_ID":
            return {
                ...state,
                pokemonById: action.payload,
            };

        case "GET_POKEMON_BY_NAME":
            const pokes = state.allPokemons
            const searchedPokemon = pokes.filter((p) => p.name.toLowerCase() === action.payload.toLowerCase());

            if (searchedPokemon.length > 0) {
                return {
                    ...state,
                    filteredPokemons: searchedPokemon,
                };
            } else {
                return {
                    ...state,
                    pokeNotFound: true
                };
            }

        case "GET_POKEMON_TYPES":
            return {
                ...state,
                pokemonTypes: [...action.payload],
            };

        case "ORDER_ASCENDING":
            return {
                ...state,
                filteredPokemons: state.filteredPokemons.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }),
            };

        case "ORDER_DESCENDING":
            return {
                ...state,
                filteredPokemons: state.filteredPokemons.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                }),
            };

        case "ORDER_ATTACK_ASCENDING":
            return {
                ...state,
                filteredPokemons: state.filteredPokemons.sort((a, b) => {
                    if (a.attack > b.attack) return -1;
                    if (a.attack < b.attack) return 1;
                    return 0;
                }),
            };

        case "ORDER_ATTACK_DESCENDING":
            return {
                ...state,
                filteredPokemons: state.filteredPokemons.sort((a, b) => {
                    if (a.attack < b.attack) return -1;
                    if (a.attack > b.attack) return 1;
                    return 0;
                }),
            };

        default: return state;
    };
};

export default rootReducer;
  