import axios from "axios";
import { useState, useEffect } from "react"
import styles from './Reservas.module.css'


export const Reservas = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    axios.get("https://cinema-abdi.herokuapp.com/cinema/invoice").then((response) => {
      let datos = response.data;

      setInvoices(
        response.data
      );
    });
  }, []);



  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(`loggedUser`);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
    }
  }, []);

  const invoiceNew = invoices.filter((nombre)=>nombre.nombre == loggedUser.userName)
console.log(invoiceNew)

  return (
<div>
    <h1>{loggedUser.userName}</h1>
    <div >
    {invoiceNew.map((invoice) => (
        <p className={styles.container} > <b className={styles.text}> Factura:</b> {invoice._id}<br></br>
            <b className={styles.text}>Total : </b>{invoice.total}<br></br>
            <b className={styles.text}>Asientos reservados:</b>{[invoice.reservas]}<br></br>
           <b className={styles.text}>Horario:</b>  {invoice.horario}<br></br>
           <b className={styles.text}>Pelicula:</b>  {invoice.pelicula}<br></br>
           <br></br>
           
        </p>
   
      ))}
    </div>
      
    
    </div>
  );
};
