import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const CreateMovieUrl = "https://cinema-abdi.herokuapp.com/cinema/movies";

export const CreateMovie = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(`/`);
  };

  const [name, setName] = useState(``);
  const [price, setPrice] = useState(``);
  const [estreno, setEstreno] = useState(``);
  const [image, setImage] = useState(``);
  const [hora1, setHora1] = useState(``);
  const [hora2, setHora2] = useState(``);
  const [hora3, setHora3] = useState(``);

  const [movie, setMovie] = useState(null);

  const CrearPelicula = async (credentials) => {
    const { data } = await axios.post(CreateMovieUrl, credentials);
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const  newPeli= await CrearPelicula(pelicula);

      setMovie(newPeli);
    setEstreno(``)
    setHora1(``)
    setHora2(``)
    setHora3(``)
    setImage(``)
    setName(``)
    setPrice(``)
      back();
      console.log(movie)
    } catch (error) {
      console.log(error.response);
    }
  };

  const pelicula = {
    name: name,
    price: price,
    estreno: estreno,
    image:image,
    horarios: [
      {
        idHorario: 1,
        horario: hora1,
        asientosOcupados: [`01`,`04`,`7`, `10`,`13`, `16`, `19`,`22`,`25`,`28`,`31`,`34`,`37`,`40`,`43`,`46`,
        "00", "03", "06",`09`,`12`,`15`, `18`,`21`,`24`,`27`,`30`,`33`,`36`,`39`,`42`,`45`,`48`],
      },
      {
        idHorario: 2,
        horario: hora2,
        asientosOcupados: [`01`,`04`,`7`, `10`,`13`, `16`, `19`,`22`,`25`,`28`,`31`,`34`,`37`,`40`,`43`,`46`],
      },
      {
        idHorario: 3,
        horario: hora3,
        asientosOcupados: ["00", "03", "06",`09`,`12`,`15`, `18`,`21`,`24`,`27`,`30`,`33`,`36`,`39`,`42`,`45`,`48`],
      },
    ],
  };

  return (
    <div>
      <h1 className={styles.Tlogin}>Crear Pelicula</h1>
      <form className={styles.Login} onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.LoginInput}
            type="string"
            value={name}
            name="name"
            placeholder="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <input
            className={styles.LoginInput}
            type="number"
            value={price}
            name="price"
            placeholder="price"
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>
        <div>
          <input className={styles.LoginInput} type="year" value={estreno}
            name="estreno" placeholder="estreno" onChange={({ target }) => setEstreno(target.value)}/>
        </div>
        <div>
          <input className={styles.LoginInput} type="text" value={image}
            name="image" placeholder="image" onChange={({ target }) => setImage(target.value)}/>
        </div>
        <div>
          <input className={styles.LoginInput} type="text" value={hora1}
            name="horario-1" placeholder="horario-1" onChange={({ target }) => setHora1(target.value)}/>
        </div>
        <div>
          <input className={styles.LoginInput} type="text" value={hora2}
            name="horario-2" placeholder="horario-2" onChange={({ target }) => setHora2(target.value)}/>
        </div>
        <div>
          <input className={styles.LoginInput} type="text" value={hora3}
            name="horario-3" placeholder="horario-3" onChange={({ target }) => setHora3(target.value)}/>
        </div>

        <button className={styles.LoginButton} onSubmit={handleSubmit}>
          {" "}
          create movie
        </button>
      </form>
    </div>
  );
};
