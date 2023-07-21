import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, types, image, attack }) => {
  console.log(types);
  return (
    <div className={style.card}>
      <NavLink to={`/detail/${id}`}>
        <h3>{name}</h3>
      </NavLink>
      <p>Attack: {attack}</p>
      <p>
        Types:
        {types?.map((type) => (
          <span key={type.name}>{type.name}</span>
        ))}
      </p>
      <img src={image} alt="" />
    </div>
  );
};

export default Card;
