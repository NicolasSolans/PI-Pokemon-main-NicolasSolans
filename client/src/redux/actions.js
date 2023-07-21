import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_TYPES = "GET_TYPES";
export const POST_ALL = "POST_ALL";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/pokemons");
      const pokemons = apiData.data;
      dispatch({ type: GET_POKEMONS, payload: pokemons });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);

    const idPokemon = apiData.data;
    dispatch({ type: GET_DETAIL, payload: idPokemon });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/types");

    const typesPokemon = apiData.data;
    dispatch({ type: GET_TYPES, payload: typesPokemon });
  };
};

export const postAll = (payload) => {
  return async function (dispatch) {
    const apiData = await axios.post("http://localhost:3001/pokemons", payload);

    const createPokemon = apiData.data;
    dispatch({ type: POST_ALL, payload: createPokemon });
  };
};

export const searchPokemons = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );

      const pokemonName = apiData.data;
      if (pokemonName.length > 0) {
        dispatch({ type: SEARCH_POKEMONS, payload: pokemonName });
        dispatch(setCurrentPage(1));
      } else {
        alert("No existen pokemons con este nombre.");
      }
    } catch (error) {
      alert("Error al buscar pokemons.");
    }
  };
};

export const setCurrentPage = (pageNumber) => {
  return {
    type: CURRENT_PAGE,
    payload: pageNumber,
  };
};

export const filterTypes = (payload) => {
  return (dispatch) => {
    dispatch({ type: FILTER_TYPES, payload });
    dispatch(setCurrentPage(1));
  };
};

export const filterCreated = (payload) => {
  return (dispatch) => {
    dispatch({ type: FILTER_CREATED, payload });
    dispatch(setCurrentPage(1));
  };
};

export const orderName = (option, direction) => {
  return (dispatch) => {
    dispatch({ type: ORDER_NAME, payload: { option, direction } });
    dispatch(setCurrentPage(1));
  };
};
