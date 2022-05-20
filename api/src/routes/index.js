const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemon = require('./pokemon.js');
const Type = require('./type');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", Pokemon); // Route of Pokemon
router.use("/types", Type); // Route of Type

module.exports = router;
