import styles from './MovieCard.module.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

 
export const MovieCard = ({movie}) => {



  return  <div>
    <li className={styles.movieCard}>
    <img src={movie.image} alt={movie.name} className={styles.movieImage}/>
    {movie.name}<br></br>
    <b className={styles.price}>Price: </b> { movie.price} 
    </li>
    <Link to={`/buy-tickets/${movie._id}/1`}  className={styles.link}>{movie.horarios[0].horario}</Link>
    <Link to={`/buy-tickets/${movie._id}/2`}  className={styles.link}>{movie.horarios[1].horario}</Link>
    <Link to={`/buy-tickets/${movie._id}/3`}  className={styles.link}>{movie.horarios[2].horario}</Link>
   </div>
    ;
};

