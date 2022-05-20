const { Router } =require("express");
const router = Router();
const { getPokemons, getPokemonsByID, postPokemon } = require ("../controllers/pokemons");

router.get("/", getPokemons); // Get all and by name
router.get("/:idPokemon", getPokemonsByID); // Get by ID
router.post("/", postPokemon); // Post pokemon

module.exports = router;