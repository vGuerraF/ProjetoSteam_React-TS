import * as S from "./styles";
import { ModalOverlayCrudBox } from "../ModalOverlay";
import Genre from "../../types/genres";
import { useGenres } from "../../contexts/genres";
import api from "../../api";
import toast from "react-hot-toast";
import ToastStyle from "../../types/toastStyle";
import Button from "../Button";
import headers from "../../api/header";

interface ModalDeleteGenreProps {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  genre: Genre;
}

const ModalDeleteGenre = ({
  setShowDeleteModal,
  genre,
}: ModalDeleteGenreProps) => {
  const { getAllGenres } = useGenres();

  const handleGenreDeletion = () => {
    api
      .delete(`/genre/${genre.id}`, headers)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Genre successfully deleted", ToastStyle);
          setShowDeleteModal(false);
          getAllGenres();
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
      <S.ModalDeleteGenre>
        <section>
          <span>Confirm genre deletion</span>
          <a onClick={() => setShowDeleteModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <span>Do you really want to delete {genre.genre_title}?</span>
        </div>
        <div>
          <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button onClick={handleGenreDeletion} specialColor="delete">
            Yes
          </Button>
        </div>
      </S.ModalDeleteGenre>
    </ModalOverlayCrudBox>
  );
};

export default ModalDeleteGenre;
