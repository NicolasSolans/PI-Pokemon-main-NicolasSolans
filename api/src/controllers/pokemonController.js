const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getPokemon = async (id, source) => {
  if (source === "api") {
    const response = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    ).data;
    const apiPokemon = {
      id: response.id,
      name: response.name,
      image:
        response.sprites.versions["generation-v"]["black-white"].animated[
          "front_default"
        ],
      types: response.types.map((t) => {
        return { name: t.type.name };
      }),
      health: response.stats.find((s) => s.stat.name === "hp").base_stat,
      attack: response.stats.find((s) => s.stat.name === "attack").base_stat,
      defense: response.stats.find((s) => s.stat.name === "defense").base_stat,
      speed: response.stats.find((s) => s.stat.name === "speed").base_stat,
      height: response.height,
      weight: response.weight,
    };

    return apiPokemon;
  } else {
    const dbPokemon = await Pokemon.findByPk(id, {
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return dbPokemon;
  }
};

const getPokemonByName = async (name) => {
  const toLowerCaseName = name.toLowerCase();

  // Buscar en la base de datos
  const dbPokemon = await Pokemon.findAll({
    where: { name: { [Op.iLike]: `%${toLowerCaseName}%` } },
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  // Buscar en la API
  let apiPokemon = [];
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${toLowerCaseName}`
    );

    apiPokemon = [
      {
        id: response.data.id,
        name: response.data.name,
        attack: response.data.stats.find((s) => s.stat.name === "attack")
          .base_stat,
        image:
          response.data.sprites.versions["generation-v"]["black-white"]
            .animated["front_default"],
        types: response.data.types.map((t) => {
          return { name: t.type.name };
        }),
      },
    ];
  } catch (error) {
    // Manejar el caso de que no se encuentre el Pokémon en la API
    if (error.response && error.response.status === 404) {
      console.log(`Pokémon '${toLowerCaseName}' not found in the API.`);
    } else {
      console.log("Error retrieving Pokémon from the API:", error);
    }
  }

  const filteredApi = apiPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(toLowerCaseName)
  );

  return [...dbPokemon, ...filteredApi];
};

const getAllPokemon = async () => {
  const dbPokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const response = (
    await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=101")
  ).data.results;

  //Obtengo de la API, todas las url mediante el .map
  const infoPokemons = response.map((pokemon) => pokemon.url);

  //mapeo las url y utilizo axios para agarrar la info de cada url
  const promise = infoPokemons.map((url) => axios.get(url));

  //Con Promise.all resuelvo todas las promesas de todas las APIs juntas
  const allPromise = await Promise.all(promise);

  //Mapeo cada url ya resuelta para sacar la info que necesito mostrar en Home.
  const apiPokemon = allPromise.map((poke) => {
    return {
      id: poke.data.id,
      name: poke.data.name,
      attack: poke.data.stats.find((s) => s.stat.name === "attack").base_stat,
      image:
        poke.data.sprites.versions["generation-v"]["black-white"].animated[
          "front_default"
        ],
      types: poke.data.types.map((t) => {
        return {
          name: t.type.name,
        };
      }),
    };
  });

  const pokemon = [...dbPokemon, ...apiPokemon];
  return pokemon;
};

const createPokemon = async (
  name,
  image,
  health,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  const nameUsed = await Pokemon.findOne({
    where: { name: name.toLowerCase() },
  });
  if (nameUsed) {
    throw new Error("Ya hay un pokemon con ese nombre...");
  }

  const newPokemon = await Pokemon.create({
    name: name.toLowerCase(),
    health: health,
    attack: attack,
    defense: defense,
    speed: speed,
    height: height,
    weight: weight,
    image: image,
  });

  let typesDB = await Type.findAll({ where: { id: types } });

  // Asociar los tipos al Pokémon creado
  await newPokemon.addTypes(typesDB);

  // Cargar los tipos asociados
  const pokemonTypes = await Pokemon.findOne({
    where: { id: newPokemon.id },
    include: Type,
  });

  return pokemonTypes;
};

module.exports = {
  createPokemon,
  getPokemon,
  getPokemonByName,
  getAllPokemon,
};
