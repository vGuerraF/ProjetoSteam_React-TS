import toast from "react-hot-toast";
import api from "../../api";
import { useAuth } from "../../contexts/auth";
import { useProfile } from "../../contexts/profile";
import Game from "../../types/game";
import ToastStyle from "../../types/toastStyle";
import * as S from "./styles";

interface GameHomeCardProps {
  game: Game;
  getProfileFavorites: () => void;
  favorited?: string;
}

const GameHomeCard = ({
  game,
  getProfileFavorites,
  favorited,
}: GameHomeCardProps) => {
  const { profile } = useProfile();
  const { logged } = useAuth();

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
    },
  };

  const favoriteGame = () => {
    const favoriteGameData = {
      game_id: game.id,
      profile_id: profile.id,
    };
    api
      .post("/favorite", favoriteGameData, headers)
      .then((res) => {
        if (res.status === 201) {
          toast.success(`${game.title} was favorited`, ToastStyle);
          getProfileFavorites();
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 422) {
          toast.error(`${game.title} is already favorited`, ToastStyle);
        } else {
          toast.error("Something went wrong when favoriting game", ToastStyle);
        }
      });
  };

  const unfavoriteGame = () => {
    api
      .delete(`/favorite/${favorited}`, headers)
      .then((res) => {
        if (res.status === 204) {
          toast.success(`${game.title} was unfavorited`, ToastStyle);
          getProfileFavorites();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong when unfavoriting game", ToastStyle);
      });
  };

  return (
    <>
      <S.GameHomeCard>
        <img src={game.cover_image_url} alt={game.title} />
        <div>
          <span>{game.year}</span>
          <p>{game.title}</p>
          <span>Metacritic Score: {game.score}</span>
        </div>
        {logged && (
          <a onClick={favorited ? unfavoriteGame : favoriteGame}>
            {favorited ? (
              <S.FavoriteIconSelected />
            ) : (
              <S.FavoriteIconUnselected />
            )}
          </a>
        )}
      </S.GameHomeCard>
    </>
  );
};

export default GameHomeCard;
