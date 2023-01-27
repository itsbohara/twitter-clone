import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
// utils
import http from "@/client/axios";
import { isValidToken, setSession } from "@/utils/jwt";
// import _mock from "_mock/_mock";
import { delay } from "@/utils/delay";

// ----------------------------------------------------------------------

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any;
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
  logout: () => void;
  register: (name, email, password) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
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
          setSession(accessToken);
          const user = await getCurrentUser();
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user: user },
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
    dispatch({
      type: "LOGIN",
      payload: { isAuthenticated: true, user },
    });
  };

  const login = async (email, password) => {
    const response = await http.post("/account/login", { email, password });
    onLoginSuccess(response.data);
    await fetchLoggedUser();
  };

  const onLoginSuccess = ({ _token: accessToken }) => setSession(accessToken);

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
  };

  const getCurrentUser = async () => {
    try {
      var response = await http.get("/account/me");
      return response.data?.currentUser;
    } catch (error) {
      console.error("auth error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
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
