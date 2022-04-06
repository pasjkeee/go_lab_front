import { createContext } from "react";
import { ResultUsers } from "../service/userService";

export interface KeyStringAny {
  users: ResultUsers | null;
}

export interface FormContextProps<T = unknown> {
  data: T | undefined;
}

export const FormDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<ResultUsers[] | null>>
>({} as React.Dispatch<React.SetStateAction<ResultUsers[] | null>>);

export const FormDataContext = createContext<ResultUsers[] | null>(null);
