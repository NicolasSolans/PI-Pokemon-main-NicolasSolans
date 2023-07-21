const {
  createPokemon,
  getPokemon,
  getPokemonByName,
  getAllPokemon,
} = require("../controllers/pokemonController");

const getPokemonHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const pokemon = name ? await getPokemonByName(name) : await getAllPokemon();
    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const pokemon = await getPokemon(id, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const PostPokemonHandler = async (req, res) => {
  try {
    const {
      name,
      image,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    } = req.body;
    if (!name) {
      return res.status(404).send("Name not found");
    }

    const pokemon = await createPokemon(
      name,
      image,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );

    res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonById,
  PostPokemonHandler,
};
