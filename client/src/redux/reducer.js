import {
  GET_POKEMONS,
  GET_DETAIL,
  GET_TYPES,
  POST_ALL,
  FILTER_TYPES,
  SEARCH_POKEMONS,
  CURRENT_PAGE,
  FILTER_CREATED,
  ORDER_NAME,
} from "./actions";

const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  detail: {},
  types: [],
  currentPage: 1,
  searchQuery: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
      };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case POST_ALL:
      return { ...state };

    case SEARCH_POKEMONS:
      return { ...state, pokemons: action.payload, currentPage: 1 };

    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case FILTER_TYPES: {
      const filtered =
        action.payload === "all"
          ? state.pokemonsCopy
          : state.pokemonsCopy.filter((e) =>
              e.types?.map((e) => e.name).includes(action.payload)
            );

      return {
        ...state,
        pokemons: filtered,
        currentPage: 1,
      };
    }

    case FILTER_CREATED: {
      const filtrado =
        action.payload === "created"
          ? state.pokemonsCopy.filter((el) => typeof el.id !== "number")
          : state.pokemonsCopy.filter((el) => typeof el.id === "number");
      return {
        ...state,
        pokemons: action.payload === "all" ? state.pokemonsCopy : filtrado,
        currentPage: 1,
      };
    }

    case ORDER_NAME:
      const { option, direction } = action.payload;
      const sortedPokemons = [...state.pokemons];

      if (option === "alfabetico") {
        sortedPokemons.sort((a, b) => {
          if (direction === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if (option === "attack") {
        sortedPokemons.sort((a, b) => {
          if (direction === "asc") {
            return b.attack - a.attack;
          } else {
            return a.attack - b.attack;
          }
        });
      }

      return {
        ...state,
        pokemons: sortedPokemons,
        currentPage: 1,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
