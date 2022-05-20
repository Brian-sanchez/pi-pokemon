const { addPokemon, getPokemonsAPI, getAllPokemons } = require("./index");
const { Pokemon, Type } = require("../db.js");

// Get All and By Name Pokemons
async function getPokemons(req, res) {
    let { name } = req.query;
    
    if (name) {
        const pokemonDB = await Pokemon.findAll({
            where: {
                name: req.query.name.toLowerCase(),
            }
        });

        if (pokemonDB.length) {
            return res.json(pokemonDB);
        } else {
            const pokemonsApi = await getPokemonsAPI();
            const foundPokemon = pokemonsApi.find((p) => p.name.toLowerCase() === name.toLowerCase());

            if (foundPokemon) {
                return res.json(foundPokemon);
            } else {
                return res.status(404).json("Not Found Pokemon");
            };
        };
    };

    const pokemons = await getAllPokemons();

    return res.status(200).json(pokemons);
};

// Get pokemons by ID
async function getPokemonsByID(req, res) {
    const id = Number(req.params.idPokemon);

    if (typeof id === "number") {
        const pokemonDb = await Pokemon.findOne({
            where: {
                id: id,
            },
            include: {
                model: Type,
                attributes: ["name"],
            }
        });

        if (pokemonDb) {
            return res.json(pokemonDb);
        } else {
            const pokemonsApi = await getPokemonsAPI();
            const foundPokemon = pokemonsApi.find((p) => p.id === id);

            if (foundPokemon) {
                return res.json(foundPokemon);
            } else {
                return res.status(404).json("El ID ingresado no pertenece a ningún pokemon");
            };
        };
    } else {
        return res.send("El ID debe ser un número").status(404);
    };
};

// Post pokemon
async function postPokemon(req, res) {
    await addPokemon(req, res);
};

module.exports = { getPokemons, getPokemonsByID, postPokemon }