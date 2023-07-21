import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing}>
      <h1>Bienvenidos a mi página web de Pokemons!</h1>
      <h3>Click en "Home" para ver todos los pokemones</h3>
    </div>
  );
};

export default Landing;
