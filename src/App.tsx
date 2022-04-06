import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import NftMain from "./components/NftMain";
import { Route, Switch } from "react-router-dom";
import LoginWindow from "./components/LoginWindow";
import usePing from "./hooks/usePing";
import { AuthDataContext, AuthDispatchContext } from "./providers/authProvider";

function App() {
  const { authorized } = usePing();

  const dispatch = useContext(AuthDispatchContext);
  const data = useContext(AuthDataContext);

  useEffect(() => {
    dispatch && dispatch.setAuth(authorized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  if (!data.auth) {
    return (
      <Switch>
        <Route path="*">
          <LoginWindow />
        </Route>
      </Switch>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path="*">
          <NftMain />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
