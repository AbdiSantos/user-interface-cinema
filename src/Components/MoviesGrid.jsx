
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import axios from "axios";
import { MovieDetails } from "../app";
import { useEffect, useState } from "react";

export const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get("https://cinema-abdi.herokuapp.com/cinema/movies/").then((response) => {
      setMovies(response.data);
    });
  }, []);

   return (<div>
       <div className={styles.title}>Movies</div>
    <ul className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </ul>
    </div>
  );  
};
