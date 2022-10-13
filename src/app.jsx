import { MoviesGrid } from "./Components/MoviesGrid";
import style from "./app.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/signUp";
import { useState, useEffect } from "react";
import axios from "axios";
import { SalaCine } from "./Components/SalaCine";
import { Reservas } from "./Components/Reservas";
import { CreateMovie } from "./Components/CreateMovies";

export function MovieDetails() {
  const { movieId } = useParams();
  const { horarioId } = useParams();

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(``);

  useEffect(() => {
    axios
      .get("https://cinema-abdi.herokuapp.com/cinema/movies/")
      .then((response) => {
        setMovies(response.data);
        console.log(loggedUser);
      });
  }, []);

  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(`loggedUser`);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
    }
  }, [loggedUser]);

  const selectmovie = movies.find((movie) => movie._id == movieId);

  useEffect(() => {
    setSelectedMovie(selectmovie);
  }, [selectmovie]);

  if (movieId) {
    console.log(selectmovie);
    return `esta es la sala de cine ${movieId}, con el horario ${horarioId}`;
  }
}

export const Peliculas = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(`loggedUser`);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user.roles[0]);
    }
  }, []);

  const handleLogout = () => {
    setLoggedUser([``]);
    window.localStorage.removeItem(`loggedUser`);
  };

  return (
    <Router>
      <header className={style.nav}>
        {loggedUser.name ? (
          loggedUser.name == "admin" ? (
            <nav>
              <Link to="/crear" className={style.link}>
                Crear Pelicula
              </Link>
              <Link to="/" className={style.link}>
                Home
              </Link>
              <Link className={style.linkLogout} onClick={handleLogout}>
                {" "}
                Cerrar Sesion
              </Link>
            </nav>
          ) : (
            <nav>
              <Link to="/" className={style.link}>
                Home
              </Link>
              <Link className={style.linkLogout} onClick={handleLogout}>
                {" "}
                Cerrar Sesion
              </Link>
              <Link to="/reservas" className={style.link}>
                Reservas
              </Link>
            </nav>
          )
        ) : (
          <nav>
            <Link to="/login" className={style.link}>
              Login
            </Link>

            <Link to="/" className={style.link}>
              home
            </Link>
          </nav>
        )}
      </header>

      <main>
        {
          //1 = admin
          loggedUser.name ? (
            loggedUser.name == "admin" ? (
              <>
                <Routes>
                  <Route path="/" element={<MoviesGrid />} />
                  <Route path="/crear" element={<CreateMovie />} />
                </Routes>
              </>
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<MoviesGrid />} />
                  <Route path="/reservas" element={<Reservas />} />
                  <Route
                    path={`/buy-tickets/:movieId/:horarioId`}
                    element={<SalaCine />}
                  />
                </Routes>
              </>
            )
          ) : (
            <Routes>
              <Route path="/" element={<MoviesGrid />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </Routes>
          )
        }
      </main>
    </Router>
  );
};
