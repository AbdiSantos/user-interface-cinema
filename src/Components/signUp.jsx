import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'


const signInUrl = "https://cinema-abdi.herokuapp.com/cinema/auth/signup";

export const SignUp = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(`/login`);
  };

  const [password, setPassword] = useState(``);
  const [email, setEmail] = useState(``);
  const [username, setUsername] = useState(``);

  const [user, setUser] = useState(null);

  const sigIn = async (credentials) => {
    const { data } = await axios.post(signInUrl, credentials);
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await sigIn({ email, password, username });

      setUser(user);
      setEmail(``);
      setPassword(``);
      setUsername(``);
      back();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1 className={styles.Tlogin}>Crear Cuenta</h1>
      <form className={styles.Login} onSubmit={handleSubmit}>
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
        <div>
          <input
          className={styles.LoginInput}
            type="text"
            value={username}
            name="username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <button className={styles.LoginButton} onSubmit={handleSubmit}> sign in</button>
      </form>
    </div>
  );
};
