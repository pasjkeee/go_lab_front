import React, { FunctionComponent, useState } from "react";

export const AuthDispatchContext = React.createContext<
  | {
      setAuth: React.Dispatch<React.SetStateAction<boolean>>;
      setAuthHeader: React.Dispatch<React.SetStateAction<string>>;
      setLogin: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);
export const AuthDataContext = React.createContext<{
  auth: boolean;
  authHeader: string;
  login: string;
}>({
  auth: false,
  authHeader: "",
  login: "",
});

const AuthProvider: FunctionComponent = ({ children }) => {
  const localStorageToken = window.localStorage.getItem("authToken");

  const [auth, setAuth] = useState<boolean>(!!localStorageToken);
  const [authHeader, setAuthHeader] = useState<string>(localStorageToken ?? "");
  const [login, setLogin] = useState<string>("");

  return (
    <AuthDataContext.Provider value={{ auth, authHeader, login }}>
      <AuthDispatchContext.Provider
        value={{ setAuth, setAuthHeader, setLogin }}
      >
        {children}
      </AuthDispatchContext.Provider>
    </AuthDataContext.Provider>
  );
};

export default AuthProvider;
