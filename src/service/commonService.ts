import { AxiosResponse, CancelToken } from "axios";
import API from "../utils/API";

export const ping = (cancelToken: CancelToken, authHeader: string) => {
  return API.get("/users", {
    cancelToken,
    headers: {
      Authorization: authHeader,
    },
  }).then((res: AxiosResponse<null>) => res.status);
};

export const auth = (
  cancelToken: CancelToken,
  login: string,
  password: string
) => {
  return API.post(
    "/login",
    { login, password },
    {
      cancelToken,
    }
  ).then((res: AxiosResponse<{ token: string; login: string }>) => {
    return res.data;
  });
};

export const signup = (
  cancelToken: CancelToken,
  login: string,
  password: string
) => {
  return API.post(
    "/signup",
    { login, password },
    {
      cancelToken,
    }
  ).then((res: AxiosResponse<{ token: string; login: string }>) => {
    return res.data;
  });
};

export const logOut = (
  login: string,
  cancelToken: CancelToken,
  authHeader: string
) => {
  return API.post(
    "/logout",
    { login },
    {
      cancelToken,
      headers: {
        Authorization: authHeader,
      },
    }
  ).then((res: AxiosResponse<null>) => res.status);
};
