import { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import Genre from "../../types/genres";
import ToastStyle from "../../types/toastStyle";

interface GenreProviderProps {
  children: ReactNode;
}

interface GenreProviderData {
  genres: Genre[];
  getAllGenres: () => void;
}

const GenreContext = createContext<GenreProviderData>({} as GenreProviderData);

export const GenreProvider = ({ children }: GenreProviderProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const getAllGenres = () => {
    api
      .get("/genre")
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => {
        toast.error("There was a problem when reading genres...", ToastStyle);
        console.error(err);
      });
  };

  return (
    <GenreContext.Provider value={{ genres, getAllGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenres = () => useContext(GenreContext);
