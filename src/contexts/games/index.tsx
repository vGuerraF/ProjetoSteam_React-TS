import { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import Game from "../../types/game";
import ToastStyle from "../../types/toastStyle";

interface GameProviderProps {
  children: ReactNode;
}

interface GameProviderData {
  games: Game[];
  getAllGames: () => void;
}

const GameContext = createContext<GameProviderData>({} as GameProviderData);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const getAllGames = () => {
    api
      .get("/game")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        toast.error("There was a problem when reading games...", ToastStyle);
        console.error(err);
      });
  };

  return (
    <GameContext.Provider value={{ games, getAllGames }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => useContext(GameContext);
