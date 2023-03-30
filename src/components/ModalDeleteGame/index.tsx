import toast from "react-hot-toast";
import api from "../../api";
import { useGames } from "../../contexts/games";
import Game from "../../types/game";
import ToastStyle from "../../types/toastStyle";
import Button from "../Button";
import { ModalOverlayCrudBox } from "../ModalOverlay";
import * as S from "./styles";

interface ModalDeleteGameProps {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  game: Game;
}

const ModalDeleteGame = ({
  setShowDeleteModal,
  game,
}: ModalDeleteGameProps) => {
  const { getAllGames } = useGames();

  const handleGameDeletion = () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    api
      .delete(`/game/${game.id}`, headers)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Game successfully deleted", ToastStyle);
          setShowDeleteModal(false);
          getAllGames();
        }
      })
      .catch((err) => {
        if (err.response.status === 401)
          toast.error("Operation unauthorized", ToastStyle);
        console.error(err);
      });
  };

  return (
    <ModalOverlayCrudBox>
      <S.ModalDeleteGame>
        <section>
          <span>Confirm game deletion</span>
          <a onClick={() => setShowDeleteModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <span>Do you really want to delete {game.title}?</span>
        </div>
        <div>
          <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button onClick={handleGameDeletion} specialColor="delete">
            Yes
          </Button>
        </div>
      </S.ModalDeleteGame>
    </ModalOverlayCrudBox>
  );
};

export default ModalDeleteGame;
