import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SalaCine.css";

export const SalaCine = () => {
  let { movieId, horarioId } = useParams();
  const [movie, setMovie] = useState([]);
  const [newMovie, setNewMovie] = useState([]);
  const [horario, setHorario] = useState([]);
  const [butacasOcupadas, setButacasOcupadas] = useState([]);
  let filas = 5;
  let columnas = 10;
  let butacas = Array(filas)
    .fill()
    .map(() => Array(columnas).fill());

  const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);

  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(`loggedUser`);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://cinema-abdi.herokuapp.com/cinema/movies/${movieId}`)
      .then((response) => {
        const selectedMovie = response.data;
        const horario = selectedMovie.horarios.filter(
          (horario) => horario.idHorario == horarioId
        );
        setMovie(selectedMovie);
        setHorario(horario[0]);
        setButacasOcupadas(horario[0].asientosOcupados);
      });
  }, []);

  const getButaca = (indice, indice2) => {
    let id = `${indice}${indice2}`;
    let seleccionados = butacasSeleccionadas.filter((butaca) => butaca == id);
    let ocupados = butacasOcupadas.filter((butaca) => butaca == id);

    if (seleccionados.length > 0) {
      return 1;
    } else if (ocupados.length > 0) {
      return 2;
    } else {
      return 0;
    }
  };

  const Invoice = async (credentials) => {
    const { data } = await axios.post(invoiceUrl, credentials);
    return data;
  };

  const invoiceSubmit = async () => {
    try {
      const invoice = await Invoice(factura);

      console.log(invoice);
    } catch (error) {}
  };

  const seleccionar = (indice, indice2) => {
    let id = `${indice}${indice2}`;
    let isSelected = butacasSeleccionadas.filter((butaca) => butaca === id)[0];

    if (isSelected) {
      setButacasSeleccionadas(
        butacasSeleccionadas.filter((butaca) => butaca !== id)
      );
    } else {
      setButacasSeleccionadas([...butacasSeleccionadas, id]);
    }
  };

  const invoiceUrl = `https://cinema-abdi.herokuapp.com/cinema/invoice`;

  let factura = {
    nombre: loggedUser.userName,
    total: movie.price * butacasSeleccionadas.length,
    reservas: [butacasSeleccionadas],
    pelicula: movie.name,
    horario: horario.horario,
  };

  const reservar = () => {
    const url = `https://cinema-abdi.herokuapp.com/cinema/movies/${movieId}`;

    setButacasOcupadas([...butacasOcupadas, ...butacasSeleccionadas]);
    setButacasSeleccionadas([]);
    invoiceSubmit();

    let horarios = movie.horarios;
    horarios[horarioId - 1].asientosOcupados = [
      ...butacasOcupadas,
      ...butacasSeleccionadas,
    ];
    alert("Reserva exitosa");
    axios.put(url, { horarios: horarios });
  };

  return (<>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {butacas.map((filas, indice) => {
        return (
          <Grid
            container
            flexDirection={"row"}
            xs={12}
            sx={{ marginLeft: "200px" }}
          >
            {filas.map((celda, indice2) => {
              return (
                <Grid item>
                  {getButaca(indice, indice2) === 0 ? (
                    <div
                      className="butaca libre"
                      onClick={() => seleccionar(indice, indice2)}
                    >
                      {indice} , {indice2}
                    </div>
                  ) : getButaca(indice, indice2) === 1 ? (
                    <div
                      className="butaca seleccionado"
                      onClick={() => seleccionar(indice, indice2)}
                    >
                      {indice} , {indice2}
                    </div>
                  ) : (
                    <div className="butaca bloqueado">
                      {indice} , {indice2}
                    </div>
                  )}
                </Grid>
              );
            })}
          </Grid>
        );
      })}    
    </Grid>
    <div className="container"><button className="button" onClick={() => reservar()}>
    Reservar
  </button></div>   </>
  );
};
