import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthDataContext } from "../providers/authProvider";
import { ping } from "../service/commonService";

const usePing = () => {
  const [pending, setPending] = useState<boolean>(false);
  const axiousSource = axios.CancelToken.source();
  const [authorized, setAuthorized] = useState<boolean>(false);

  const data = useContext(AuthDataContext);

  useEffect(() => {
    setPending(true);
    !pending &&
      ping(axiousSource.token, data.authHeader)
        .then((res) => setAuthorized(true))
        .catch((e) => {
          if (e.message === "Request failed with status code 401") {
            setAuthorized(false);
          }
        })
        .then(() => {
          setPending(false);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authorized, pending };
};

export default usePing;
