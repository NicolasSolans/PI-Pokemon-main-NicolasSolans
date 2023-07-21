import { setCurrentPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Paginado.module.css";

const Paginado = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPokemons = useSelector((state) => state.pokemons.length);

  const pokemonsPerPage = 12;
  const totalPage = Math.ceil(totalPokemons / pokemonsPerPage); //Crea las paginas necesarias para que entren todos los pokemons. Ceil redondea para arriba.

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      dispatch(setCurrentPage(prevPage));
    }
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPage) {
      dispatch(setCurrentPage(nextPage));
    }
  };
  return (
    <div className={style.paginado}>
      <button onClick={prevHandler}>Anterior</button>
      <span>Pagina {currentPage}</span>
      <button onClick={nextHandler}>Siguiente</button>
    </div>
  );
};

export default Paginado;
