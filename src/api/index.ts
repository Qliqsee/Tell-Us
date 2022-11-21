import axios from "axios";
import React from "react";
import GlobalContext from "../context";

export interface StateType<t> {
  data: t | null;
  loading: boolean;
  error: any;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SigninPayload {
  payload?: { email: string; password: string };
  accessToken?: string;
}
export interface SignupPayload {
  payload?: User;
  accessToken?: string;
}

const API = axios.create({ baseURL: "http://localhost:9090" });
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("user_info")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("user_info")}`;
  }

  return req;
});

const useApi = () => {
  const { signinUser, setSigninUser, setToaster } = React.useContext(GlobalContext);

  const userSignin = async ({ payload, accessToken }: SigninPayload) => {
    try {
      setSigninUser({
        ...signinUser,
        loading: true,
      });

      let response;

      if (payload) {
        response = await API.post("/users/signin", payload);
      } else if (accessToken) {
        response = await API.post("/users/signin", {
          googleAccessToken: accessToken,
        });
      } else {
        setToaster({
          show: true,
          message: "Use any of the sign in method",
          severity: "error",
        });
        return;
      }

      setSigninUser({
        loading: false,
        error: null,
        data: response.data,
      });
      localStorage.setItem("user_info", response.data.token);

      setToaster({
        show: true,
        message: "Welcome",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setToaster({
        show: true,
        message: "An error occurred",
        severity: "error",
      });
    }
  };
  const userSignup = async ({ payload, accessToken }: SignupPayload): Promise<boolean> => {
    try {
      let response;
      if (payload) {
        response = await API.post("/users/signup", payload);
      } else if (accessToken) {
        response = await API.post("/users/signup", {
          googleAccessToken: accessToken,
        });
      } else {
        setToaster({
          show: true,
          message: "Use any of the sign up method",
          severity: "error",
        });
        return false;
      }

      if (response) {
        localStorage.setItem("user_info", response.data.token);
        setToaster({
          show: true,
          message: "Welcome",
          severity: "success",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      setToaster({
        show: true,
        message: "An error occurred",
        severity: "error",
      });
      return false;
    }
  };

  return {
    userSignin,
    userSignup,
  };
};

export default useApi;
