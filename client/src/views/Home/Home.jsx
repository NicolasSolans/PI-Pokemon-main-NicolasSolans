import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainter/CardsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginado from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import {
  getPokemons,
  filterTypes,
  getTypes,
  orderName,
  filterCreated,
} from "../../redux/actions";

const Home = () => {
  useSelector((state) => state.pokemons);
  useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [optionSort, setOptionSort] = useState("alfabetico");
  const [directionSort, setDirectionSort] = useState("asc");

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderName(optionSort, directionSort));
  }, [dispatch, optionSort, directionSort]);

  function handlerTypes(event) {
    dispatch(filterTypes(event.target.value));
  }

  function handleFilterCreated(event) {
    dispatch(filterCreated(event.target.value));
  }

  const handlerOptionSort = (option) => {
    setOptionSort(option);
  };

  const handlerDiretionSort = (direction) => {
    setDirectionSort(direction);
  };

  return (
    <div className={style.home}>
      <h1>Esta es la vista de Home</h1>
      <SearchBar />

      <div className={style.filtros}>
        <span>Tipos</span>
        <select onChange={(event) => handlerTypes(event)}>
          <option value="all">All</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="electric">Electric</option>
          <option value="ground">Ground</option>
          <option value="fairy">Fairy</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="stedarkel">Stedarkel</option>
          <option value="shadow">Shadow</option>
          <option value="unknown">Unknown</option>
        </select>

        <select onChange={(event) => handleFilterCreated(event)}>
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
      </div>

      <div className={style.ordenamiento}>
        <span>Ordenar por:</span>
        <select
          value={optionSort}
          onChange={(event) => handlerOptionSort(event.target.value)}
        >
          <option value="alfabetico">Alfabético</option>
          <option value="attack">Attack</option>
        </select>

        {optionSort === "alfabetico" && (
          <select
            value={directionSort}
            onChange={(event) => handlerDiretionSort(event.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        )}

        {optionSort === "attack" && (
          <select
            value={directionSort}
            onChange={(event) => handlerDiretionSort(event.target.value)}
          >
            <option value="asc">Mayor ataque</option>
            <option value="desc">Menor ataque</option>
          </select>
        )}
      </div>

      <CardsContainer />
      <Paginado />
    </div>
  );
};

export default Home;
