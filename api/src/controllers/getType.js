const axios = require("axios");
const { Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/type";

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll({ attributes: ["name"] });

    if (types.length > 0) {
      // Si existen tipos en la base de datos, retornarlos
      return res.status(200).json(types);
    }

    const response = await axios.get(URL);
    const typesPoke = response.data.results.map((type) => ({
      name: type.name,
    }));

    await Type.bulkCreate(typesPoke);

    return res.status(200).json(typesPoke);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getTypes };
