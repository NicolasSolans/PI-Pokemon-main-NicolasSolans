const { Router } = require("express");
const pokemonRouter = Router();
const {
  getPokemonHandler,
  getPokemonById,
  PostPokemonHandler,
} = require("../handlers/pokemonHandler");

pokemonRouter.get("/", getPokemonHandler);
pokemonRouter.get("/:id", getPokemonById);
pokemonRouter.post("/", PostPokemonHandler);

module.exports = pokemonRouter;
