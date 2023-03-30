import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { RoutePath } from "../../types/routes";
import ToastStyle from "../../types/toastStyle";
import User from "../../types/user";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  logged: boolean;
  login: (params: LoginParams) => void;
  logout: (message: string) => void;
}

interface LoginParams {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [logged, setLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = ({ token, user }: LoginParams) => {
    localStorage.setItem("steamProjectToken", token);
    localStorage.setItem("steamProjectUser", JSON.stringify(user));
    setLogged(true);
    toast.success(`Welcome, ${user.user_name} !`, ToastStyle);
    navigate(RoutePath.PROFILESELECTION);
  };

  const logout = (message: string) => {
    localStorage.clear();
    setLogged(false);
    toast.success(message, ToastStyle);
    navigate(RoutePath.LOGIN);
  };

  const checkTokenValidity = () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    const user: User = JSON.parse(
      localStorage.getItem("steamProjectUser") || ""
    );
    api
      .get(`user/${user.id}`, headers)
      .then(() => {
        setLogged(true);
        navigate(RoutePath.PROFILESELECTION);
      })
      .catch((err) => {
        console.error(err);
        logout("You must log in again");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("steamProjectToken");
    if (token) checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
