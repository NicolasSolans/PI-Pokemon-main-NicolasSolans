import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postAll } from "../../redux/actions";
import style from "./Form.module.css";

const Form = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const handlerForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerCheck = (event) => {
    if (event.target.checked) {
      setForm({
        ...form,
        types: [...form.types, event.target.value],
      });
    } else {
      setForm({
        ...form,
        types: form.types.filter((type) => type !== event.target.value),
      });
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    validate();
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("No es posible crear el Pokemon");
    } else {
      dispatch(postAll(form));
      alert("Pokemon creado correctamente");
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const validate = () => {
    // ERROR PARA EL NAME
    if (form.name === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Nombre vacío",
      }));
    } else if (/^[A-Za-z ]{1,20}$/.test(form.name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Nombre inválido",
      }));
    }

    // ERROR PARA HEALTH
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.health)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        health: "Vida inválida",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        health: "",
      }));
    }

    // ERROR PARA ATTACK
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.attack)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        attack: "Ataque inválido",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        attack: "",
      }));
    }

    // ERROR PARA DEFENSE
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.defense)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        defense: "Defensa inválida",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        defense: "",
      }));
    }

    // ERROR PARA SPEED
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.speed)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        speed: "Velocidad inválida",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        speed: "",
      }));
    }

    // ERROR PARA HEIGHT
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.height)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        height: "Altura inválida",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        height: "",
      }));
    }

    // ERROR PARA WEIGHT
    if (!/^(?:[1-9][0-9]?|100)$/.test(form.weight)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        weight: "Peso inválido",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        weight: "",
      }));
    }

    // ERROR PARA TYPES
    if (form.types.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        types: "Se debe seleccionar al menos un tipo de Pokemon",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        types: "",
      }));
    }

    //ERROR PARA IMAGE
    if (!/^https?:\/\/\S+$/.test(form.image)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "URL inválida",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "",
      }));
    }
  };

  useEffect(() => {
    validate();
  }, [form]);

  return (
    <div className={style.form}>
      <h1>Esta es la vista de Form</h1>
      <form onSubmit={handlerSubmit}>
        <label>Nombre del Pokemon</label>
        <input
          type="text"
          name="name"
          onChange={handlerForm}
          value={form.name}
        />
        {errors.name !== "" && <p>{errors.name}</p>}

        <label>Vida</label>
        <input
          type="number"
          name="health"
          onChange={handlerForm}
          value={form.health}
        />
        {errors.health !== "" && <p>{errors.health}</p>}

        <label>Ataque</label>
        <input
          type="number"
          name="attack"
          onChange={handlerForm}
          value={form.attack}
        />
        {errors.attack !== "" && <p>{errors.attack}</p>}

        <label>Defensa</label>
        <input
          type="number"
          name="defense"
          onChange={handlerForm}
          value={form.defense}
        />
        {errors.defense !== "" && <p>{errors.defense}</p>}

        <label>Velocidad</label>
        <input
          type="number"
          name="speed"
          onChange={handlerForm}
          value={form.speed}
        />
        {errors.speed !== "" && <p>{errors.speed}</p>}

        <label>Altura</label>
        <input
          type="number"
          name="height"
          onChange={handlerForm}
          value={form.height}
        />
        {errors.height !== "" && <p>{errors.height}</p>}

        <label>Peso</label>
        <input
          type="number"
          name="weight"
          onChange={handlerForm}
          value={form.weight}
        />
        {errors.weight !== "" && <p>{errors.weight}</p>}

        <label>Tipo de Pokemon:</label>
        {errors.types !== "" && <p>{errors.types}</p>}
        {types.map((type) => (
          <div key={type.id}>
            <label>{type.name}</label>
            <input type="checkbox" value={type.id} onChange={handlerCheck} />
          </div>
        ))}

        <label>imagen</label>
        <input
          placeholder="Opcional"
          type="text"
          name="image"
          value={form.image}
          onChange={handlerForm}
        />
        {errors.image !== "" && <p>{errors.image}</p>}

        <button type="submit">Crear Pokemon</button>
      </form>
    </div>
  );
};

export default Form;
