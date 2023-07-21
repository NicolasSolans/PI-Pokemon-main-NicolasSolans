import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemons } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerChange = (event) => {
    setName(event.target.value);
  };

  const handlerSearch = () => {
    dispatch(searchPokemons(name));
  };
  return (
    <div className={style.searchBar}>
      <input type="search" onChange={handlerChange} value={name} />
      <button onClick={handlerSearch}>BUSCAR POKEMONS</button>
    </div>
  );
};

export default SearchBar;
