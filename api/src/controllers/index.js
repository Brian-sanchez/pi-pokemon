const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

// Get Pokemons from API
async function getPokemonsAPI() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40");
        
    const data = Promise.all(
      response.data.results.map(async (pokemon) => {
        let subRequest = await axios.get(pokemon.url);

        let pokemonResult = {
          name: subRequest.data.name,
          id: subRequest.data.id,
          hp: subRequest.data.stats[0].base_stat,
          attack: subRequest.data.stats[1].base_stat,
          defense: subRequest.data.stats[2].base_stat,
          speed: subRequest.data.stats[4].base_stat,
          height: subRequest.data.height,
          weight: subRequest.data.weight,
          image: subRequest.data.sprites.other["official-artwork"]["front_default"],
          types: subRequest.data.types.map((type) => { return { name: type.type.name } }),
          created: "false",
        };
                
        return pokemonResult;
      })
    );

    return data;
  } catch (error) {
    return error;
  };
};

// Get all pokemons included DB and API
async function getAllPokemons() {
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      // It only brings name from types
      attributes: ["name"],
    },
  });

  const ApiPokemons = await getPokemonsAPI();

  return [...dbPokemons, ...ApiPokemons];
};

// Add pokemon to DB

// DB ID
let dbId = 40;

async function addPokemon(req, res) {
  const { hp, attack, defense, speed, height, weight, image, type1, type2 } = req.body;
  const name = req.body.name.toLowerCase();
  
  const pokemon = {
    id: ++dbId,
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  };

  try {
    const createdPokemon = await Pokemon.create(pokemon);
    
    const addType1 = await createdPokemon.addType(type1, {
      through: "pokemon_type",
    });

    const addType2 = await createdPokemon.addType(type2, {
      through: "pokemon_type",
    });

    return res.status(200).send("El pokemon ha sido creado correctamente");
  } catch (error) {
    return error;
  };
};

// Get and ddd type of pokemons to DB
async function getPokemonTypes() {
  let pokemonDb = await Type.findAll();

  if (pokemonDb.length > 0) {
    return pokemonDb;
  } else {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    
    const data = Promise.all(
      response.data.results.map(async (t, index) => {
        let types = await Type.create({
          id: index + 1,
          name: t.name,
        });
        
        return types;
      })
    );

    return data;
  };
};

module.exports = { addPokemon, getPokemonsAPI, getAllPokemons, getPokemonTypes };