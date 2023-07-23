const axios = require("axios");
const { Pokemon } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon";

const isUUID = (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

const getPokemon = async (id) => {
  if (isUUID(id)) {
    const bdPokeId = await Pokemon.findByPk(id);

    if (bdPokeId) {
      return bdPokeId;
    }
  }

  const { data } = await axios.get(URL + "/" + id);
  const { name, sprites, stats, height, weight, types } = data;
  const img = sprites.front_default;

  let hp, attack, defense, speed;
  stats.forEach((stat) => {
    switch (stat.stat.name) {
      case "hp":
        hp = stat.base_stat;
        break;
      case "attack":
        attack = stat.base_stat;
        break;
      case "defense":
        defense = stat.base_stat;
        break;
      case "speed":
        speed = stat.base_stat;
        break;
      default:
        break;
    }
  });

  const pokemon = {
    id,
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types: types.map((type) => type.type.name),
  };

  console.log(data);
  return pokemon;
};

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;

    const pokemon = await getPokemon(id);
    res.json(pokemon);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getPokemonById,
};
