const { getPokemonTypes } = require("./index");

// Get all Pokemon Types
async function getPkTypes(req, res) {
    const pokemonTypes = await getPokemonTypes();
    return res.json(pokemonTypes);
};

module.exports = { getPkTypes };