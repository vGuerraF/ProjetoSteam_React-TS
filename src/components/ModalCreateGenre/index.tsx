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

interface ModalCreateGenreProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const createGenreSchema = yup.object().shape({
  genre_title: yup
    .string()
    .min(3, "Genre title is too short")
    .max(30, "Genre title is too long")
    .required("Genre title is required"),
});

const ModalCreateGenre = ({ setShowModal }: ModalCreateGenreProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createGenreSchema) });
  const { getAllGenres } = useGenres();
  const handleGenreCreation = ({ genre_title }: any) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    api
      .post("/genre", { genre_title }, headers)
      .then((res) => {
        if (res.status === 201) {
          toast.success(`${genre_title} added`, ToastStyle);
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
      <S.ModalCreateGenre onSubmit={handleSubmit(handleGenreCreation)}>
        <section>
          <span>Create new genre</span>
          <a onClick={() => setShowModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <label htmlFor="genre_title">Genre</label>
          <Input type="text" autoComplete="off" {...register("genre_title")} />
        </div>
        {errors.genre_title && (
          <S.FormErrors>{String(errors.genre_title.message)}</S.FormErrors>
        )}
        <Button type="submit">Create Genre</Button>
      </S.ModalCreateGenre>
    </ModalOverlayCrudBox>
  );
};

export default ModalCreateGenre;
