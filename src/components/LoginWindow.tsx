import axios from "axios";
import { FunctionComponent, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthDispatchContext } from "../providers/authProvider";
import { auth } from "../service/commonService";
import styles from "./styles/LoginWindow.module.css";

const LoginWindow: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const axiousSource = axios.CancelToken.source();
  const dispatch = useContext(AuthDispatchContext);
  const { setAuth } = useLocalStorage();

  const handleLogIn = () => {
    auth(axiousSource.token, login, password)
      .then(({ token, login }) => {
        if (dispatch) {
          dispatch.setAuthHeader(token);
          dispatch.setAuth(true);
          dispatch.setLogin(login);
          setAuth(token);
        }
      })
      .catch((e) => console.warn(e));
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.container}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="login"
            placeholder="Enter login"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            handleLogIn();
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginWindow;
