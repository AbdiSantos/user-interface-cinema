import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'

const signInUrl = "https://cinema-abdi.herokuapp.com/cinema/auth/signin";


export const Login = () => {




  
  const navigate= useNavigate()

  const register = () => {
    navigate(`/register`);
  }; 

  const back =()=>{
    navigate(`/`)
  }

  const [password, setPassword] = useState(``);
  const [email, setEmail] = useState(``);
  const [user, setUser] = useState(null);

  const sigIn = async (credentials) => {
    const { data } = await axios.post(signInUrl, credentials);
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await sigIn({ email, password });
      
      setUser(user);
      setEmail(``);
      setPassword(``);
      console.log(user)
    
      window.localStorage.setItem(`loggedUser`, JSON.stringify(user))
      back()
    } catch (error) {
      console.log(error);
    }
  };

  return ( <div>
    <h1 className={styles.Tlogin}>Iniciar Sesion</h1>
    <form onSubmit={handleSubmit} className={styles.Login}>
      <div>
        <input
        className={styles.LoginInput}
          type="email"
          value={email}
          name="email"
          placeholder="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        <input
        className={styles.LoginInput}
          type="password"
          value={password}
          name="password"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      
      <button className={styles.LoginButton} onSubmit={handleSubmit}> sign in</button>
      <button className={styles.LoginButton} onClick={register}>Sign up</button>
    </form>
        
         </div>

  );
};

