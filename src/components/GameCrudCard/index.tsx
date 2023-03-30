import { useState } from "react";
import Game from "../../types/game";
import ModalDeleteGame from "../ModalDeleteGame";
import ModalEditGame from "../ModalEditGame";
import * as S from "./styles";

interface GameCrudCardProps {
  game: Game;
}

const GameCrudCard = ({ game }: GameCrudCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {showDeleteModal && (
        <ModalDeleteGame setShowDeleteModal={setShowDeleteModal} game={game} />
      )}
      {showEditModal && (
        <ModalEditGame game={game} setShowEditModal={setShowEditModal} />
      )}
      <S.GameCrudCard>
        <img src={game.cover_image_url} alt={game.title} />
        <section id="crudCardInfo">
          <div id="infos">
            <h3>{game.title}</h3>
            <p>{game.year}</p>
            <p>Score: {game.score}</p>
          </div>

          <div id="cardBtns">
            <a title="Edit game" onClick={() => setShowEditModal(true)}>
              <S.EditIcon />
            </a>
            <a
              title="Delete game"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <S.DeleteIcon />
            </a>
          </div>
        </section>
      </S.GameCrudCard>
    </>
  );
};

export default GameCrudCard;
