import React, { createContext, useState } from "react";
import { StateType, User } from "../api";
import { ISimpleSnackBar } from "../components/common/Toaster";

export interface IPropsWithChildren {
  children?: React.ReactNode;
}

interface IGlobalContextProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;

  toaster: ISimpleSnackBar;
  setToaster: React.Dispatch<React.SetStateAction<ISimpleSnackBar>>;

  signinUser: StateType<User>;
  setSigninUser: React.Dispatch<React.SetStateAction<StateType<User>>>;
}
const GlobalContext = createContext<IGlobalContextProps>(
  {} as IGlobalContextProps
);

export const GlobalContextProvider = ({ children }: IPropsWithChildren) => {
  const [token, setToken] = useState<string>("string");
  const [toaster, setToaster] = React.useState<ISimpleSnackBar>({
    show: false,
    message: "",
    severity: "info",
  });
  const [signinUser, setSigninUser] = React.useState<StateType<User>>({
    data: null,
    loading: false,
    error: null,
  });

  const value = {
    token,
    setToken,

    toaster,
    setToaster,

    signinUser,
    setSigninUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children} </GlobalContext.Provider>
  );
};

export default GlobalContext;
