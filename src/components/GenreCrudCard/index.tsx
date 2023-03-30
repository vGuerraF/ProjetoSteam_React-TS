import { useState } from "react";
import Genre from "../../types/genres";
import ModalDeleteGenre from "../ModalDeleteGenre";
import ModalUpdateGenre from "../ModalUpdateGenre";
import * as S from "./styles";

interface GenreCrudCardProps {
  genre: Genre;
}

const GenreCrudCard = ({ genre }: GenreCrudCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {showDeleteModal && (
        <ModalDeleteGenre
          genre={genre}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <ModalUpdateGenre genre={genre} setShowModal={setShowEditModal} />
      )}
      <S.GenreCrudCard>
        <p>{genre.genre_title}</p>
        <div>
          <a title="Edit genre" onClick={() => setShowEditModal(true)}>
            <S.EditIcon />
          </a>
          <a title="Delete genre" onClick={() => setShowDeleteModal(true)}>
            <S.DeleteIcon />
          </a>
        </div>
      </S.GenreCrudCard>
    </>
  );
};

export default GenreCrudCard;
