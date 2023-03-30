import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useGenres } from "../../contexts/genres";
import { ModalOverlayCrudBox } from "../ModalOverlay";
import * as S from "./styles";
import { Input } from "../Input/styles";
import Button from "../Button";
import api from "../../api";
import toast from "react-hot-toast";
import ToastStyle from "../../types/toastStyle";
import Genre from "../../types/genres";

interface ModalUpdateGenreProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  genre: Genre;
}

const createGenreSchema = yup.object().shape({
  genre_title: yup
    .string()
    .min(3, "Genre title is too short")
    .max(30, "Genre title is too long")
    .required("Genre title is required"),
});

const ModalUpdateGenre = ({ setShowModal, genre }: ModalUpdateGenreProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createGenreSchema) });
  const { getAllGenres } = useGenres();
  const handleGenreUpdate = ({ genre_title }: any) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    api
      .patch(`/genre/${genre.id}`, { genre_title }, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Genre successfully edited`, ToastStyle);
          setShowModal(false);
          getAllGenres();
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Operation unauthorized", ToastStyle);
        } else if (err.response.status === 422) {
          toast.error(`${genre_title} already exists`, ToastStyle);
        } else {
          toast.error("Something went wrong during this operation", ToastStyle);
        }
        console.error(err);
      });
  };

  return (
    <ModalOverlayCrudBox>
      <S.ModalUpdateGenre onSubmit={handleSubmit(handleGenreUpdate)}>
        <section>
          <span>Update genre</span>
          <a onClick={() => setShowModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <label htmlFor="genre_title">Genre</label>
          <Input
            type="text"
            autoComplete="off"
            placeholder={genre.genre_title}
            {...register("genre_title")}
          />
        </div>
        {errors.genre_title && (
          <S.FormErrors>{String(errors.genre_title.message)}</S.FormErrors>
        )}
        <Button type="submit">Update Genre</Button>
      </S.ModalUpdateGenre>
    </ModalOverlayCrudBox>
  );
};

export default ModalUpdateGenre;
