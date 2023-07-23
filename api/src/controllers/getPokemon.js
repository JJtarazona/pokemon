const axios = require("axios");
const { Pokemon } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const getPoke = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const response = await axios.get(URL);
      const { results } = response.data;
      const pokemonDetailsPromises = results.map(({ url }) => axios.get(url));

      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

      const pokemonDetails = pokemonDetailsResponses.map(
        (response) => response.data
      );

      const todosPoke = pokemonDetails.map(
        ({ name, sprites, stats, height, weight, types, id }) => ({
          name,
          id,
          img: sprites.front_default,
          //Buscamos las estadisticas de cada pokemon y extraemos el campo base_stat
          hp: stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: stats.find((stat) => stat.stat.name === "attack").base_stat,
          defense: stats.find((stat) => stat.stat.name === "defense").base_stat,
          speed: stats.find((stat) => stat.stat.name === "speed").base_stat,
          height,
          weight,
          types: types.map((type) => type.type.name),
        })
      );

      //Retornamos todos los pokemones con sus detalles
      return res.status(200).json(todosPoke);
    } else {
      const response = await axios.get(`${URL}?name=${name.toLowerCase()}`);

      if (response.data.results.length > 0) {
        const poke = response.data.results;

        //Busco el pokemon en el arreglo y lo devuelvo
        const pokeBuscado = poke.find((pokemones) => pokemones.name === name);

        //Pregunto si encontró el pokemon
        if (pokeBuscado) {
          const pokemonResponse = await axios.get(pokeBuscado.url);
          const pokemonDetails = pokemonResponse.data;

          // Combinar los datos del Pokémon encontrado con los detalles adicionales
          const pokemonData = {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            img: pokemonDetails.sprites.front_default,
            hp: pokemonDetails.stats.find((stat) => stat.stat.name === "hp")
              .base_stat,
            attack: pokemonDetails.stats.find(
              (stat) => stat.stat.name === "attack"
            ).base_stat,
            defense: pokemonDetails.stats.find(
              (stat) => stat.stat.name === "defense"
            ).base_stat,
            speed:
              pokemonDetails.stats.find((stat) => stat.stat.name === "speed")
                ?.base_stat || null,
            height: pokemonDetails.height,
            weight: pokemonDetails.weight,
            types: pokemonDetails.types.map((type) => type.type.name),
          };
          res.status(200).json(pokemonData);
        } else {
          //Busco el pokemon en la base de datos
          const pokeNameBd = await Pokemon.findOne({ where: { name } });
          if (pokeNameBd) {
            //Devuelvo el nombre
            res.status(200).json(pokeNameBd);
          } else {
            res.status(400).json("No se encontó el pokemon en la BD");
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = { getPoke };
