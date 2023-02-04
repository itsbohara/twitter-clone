import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
// utils
import http from "@/client/axios";
import { isValidToken, setSession } from "@util/jwt";
import axios, { AxiosError } from "axios";
import { SessionUser } from "../types/user";

// ----------------------------------------------------------------------

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: SessionUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

type AuthContextType = AuthState & {
  method: string;
  login: (email, password) => Promise<void>;
  googleLogin: (token) => Promise<void>;
  logout: () => void;
  register: (name, email, password) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  fetchCurrentUser: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          const userRes = await fetch("/api/user");
          const { authenticated, user } = await userRes.json();
          authenticated && setSession(user?.token);
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: authenticated, user },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
        logout(); // clean existed session
      }
    };

    initialize();
  }, []);

  const fetchLoggedUser = async () => {
    const user = await getCurrentUser();
    dispatchLoginUser(user);
  };

  const dispatchLoginUser = (user) =>
    dispatch({
      type: "LOGIN",
      payload: { isAuthenticated: true, user },
    });

  const login = async (email, password) => {
    // THE old way
    // const response = await http.post("/account/login", { email, password });
    try {
      const loginRes = await axios.post("/api/login", { email, password });
      const { token, data: user } = loginRes.data;
      setSession(token);
      dispatchLoginUser(user);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message ?? error.message);
      }

      throw new Error("Something went wrong");
    }
  };

  const googleLogin = async (token) => {
    const loginRes = await axios.post("/api/googleLogin", { token });
    const { token: sessionToken, data: user } = loginRes.data;
    setSession(sessionToken);
    dispatchLoginUser(user);
  };

  const register = async (name, email, password) => {
    const res = await http.post("/account/register", {
      email,
      password,
      name,
    });
    return res.data;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    fetch("/api/logout");
  };

  const getCurrentUser = async () => {
    try {
      var response = await http.get("/account/me");
      return response.data?.currentUser;
    } catch (error) {
      throw new Error("Failed to get current user!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        googleLogin,
        logout,
        register,
        fetchCurrentUser: fetchLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
