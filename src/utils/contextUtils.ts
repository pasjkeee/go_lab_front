import { createContext } from "react";
import { FormContextProps, KeyStringAny } from "../context/createContext";

export type FormContextDataProps = FormContextProps<KeyStringAny>;
export type FormContextDispatchProps = (prev: KeyStringAny) => void;
