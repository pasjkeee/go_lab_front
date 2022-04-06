import { AxiosResponse, CancelToken } from "axios";
import API from "../utils/API";

export interface ResultUsers {
  Id: number;
  Login: string;
  Email: string;
  Name: string;
  Surname: string;
}

export const fetchUsers = (cancelToken: CancelToken, authHeader: string) => {
  return API.get("/users", {
    cancelToken,
    headers: {
      Authorization: authHeader,
    },
  }).then((res: AxiosResponse<Array<ResultUsers>>) => res.data);
};

export interface UserWallets {
  id: number;
  eth_balance: string;
  gas_balance: string;
}

export const fetchWallets = (
  cancelToken: CancelToken,
  id: number,
  authHeader: string
) => {
  return API.get(`/wallet/${id}`, {
    cancelToken,
    headers: {
      Authorization: authHeader,
    },
  }).then((res: AxiosResponse<Array<UserWallets>>) => res.data);
};

export interface WalletTransaction {
  id: number;
  date_time: string;
  entity_id: number;
}

export const fetchWalletTransactions = (
  cancelToken: CancelToken,
  id: number,
  authHeader: string
) => {
  return API.get(`/wallet/transactions/${id}`, {
    cancelToken,
    headers: {
      Authorization: authHeader,
    },
  }).then((res: AxiosResponse<Array<WalletTransaction>>) => res.data);
};
