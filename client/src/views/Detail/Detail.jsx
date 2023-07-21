import { useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from "./Detail.module.css";

const Detail = () => {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={style.detail}>
      <h2>Pokemon Detail</h2>
      <p>ID: {detail.id}</p>
      <p>Name: {detail.name}</p>
      <p>Types: {detail.types?.map((type) => type.name).join(", ")}</p>
      <p>Health: {detail.health}</p>
      <p>Attack: {detail.attack}</p>
      <p>Defense: {detail.defense}</p>
      <p>Speed: {detail.speed}</p>
      <p>Height: {detail.height}</p>
      <p>Weight: {detail.weight}</p>
      <img src={detail.image} alt={detail.name} />
    </div>
  );
};

export default Detail;
