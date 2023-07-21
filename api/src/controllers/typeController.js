const { Type } = require("../db");
const axios = require("axios");

const getAllTypes = async () => {
  const types = await Type.findAll();
  if (!types.length) {
    const apiType = await axios.get("https://pokeapi.co/api/v2/type");
    const typesArr = apiType.data.results.map((t) => ({ name: t.name }));
    const typesCreated = await Type.bulkCreate(typesArr);
    return typesCreated;
  }

  return types;
};

module.exports = { getAllTypes };
