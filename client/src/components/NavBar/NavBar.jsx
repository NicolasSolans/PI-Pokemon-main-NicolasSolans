import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.nav}>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>

      <NavLink to="/form">
        <button>Crear Pokemon</button>
      </NavLink>
    </div>
  );
};

export default NavBar;
