import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = 12;

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const LastPokemon = currentPage * pokemonsPerPage;
  const FirstPokemon = LastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(FirstPokemon, LastPokemon);

  return (
    <div className={style.container}>
      {currentPokemons.map((pokemon) => {
        console.log(pokemon.types);
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            attack={pokemon.attack}
            types={pokemon.types}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
