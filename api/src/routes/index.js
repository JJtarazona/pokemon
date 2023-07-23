const { Router } = require("express");
const { getPoke } = require("../controllers/getPokemon");
const { getPokemonById } = require("../controllers/getPokemonById");

const { getTypes } = require("../controllers/getType");

const { postPoke } = require("../controllers/postPokemon");

const router = Router();

router.get("/pokemons", getPoke);

router.get("/pokemons/:id", getPokemonById);

router.get("/pokemons/name=?name", getPoke);

router.get("/types", getTypes);

router.post("/pokemons", postPoke);

module.exports = router;
