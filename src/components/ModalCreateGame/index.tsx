import { ModalOverlayCrudBox } from "../ModalOverlay";
import * as S from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "../Input/styles";
import Button from "../Button";
import api from "../../api";
import headers from "../../api/header";
import toast from "react-hot-toast";
import { useGames } from "../../contexts/games";
import ToastStyle from "../../types/toastStyle";

interface ModalCreteGameProps {
  setShowCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const createGameSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Game title is too short")
    .max(100, "Game title is too long")
    .required("Game title is required"),
  cover_image_url: yup
    .string()
    .url("Cover image must be an url")
    .required("Cover image is required"),
  description: yup
    .string()
    .min(10, "Description is too short")
    .max(300, "Description is too long")
    .required("Description is required"),
  year: yup
    .number()
    .positive("Release year must be positive")
    .integer("Release year must be an integer")
    .required("Release year is required"),
  score: yup
    .number()
    .positive("Score must be positive")
    .integer("Score must be an integer")
    .min(0, "Minimal score is 0")
    .max(100, "Maximal score is 100")
    .required("Score is required"),
  trailer_url: yup
    .string()
    .url("Trailer must be an url")
    .required("Trailer is required"),
  gameplay_url: yup
    .string()
    .url("Gameplay must be an url")
    .required("Gameplay is required"),
});

const ModalCreateGame = ({ setShowCreationModal }: ModalCreteGameProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createGameSchema) });
  const { getAllGames } = useGames();

  const handleGameCreation = ({
    title,
    cover_image_url,
    description,
    year,
    score,
    trailer_url,
    gameplay_url,
  }: any) => {
    const dto = {
      title,
      cover_image_url,
      description,
      year,
      score,
      trailer_url,
      gameplay_url,
    };
    api
      .post("game", dto, headers)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Game successfully created", ToastStyle);
          getAllGames();
          setShowCreationModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 422) {
          toast.error("Title already exists", ToastStyle);
        } else {
          toast.error("Something went wrong", ToastStyle);
        }
      });
  };

  return (
    <ModalOverlayCrudBox>
      <S.ModalCreateGame onSubmit={handleSubmit(handleGameCreation)}>
        <section>
          <span>Create new game</span>
          <a onClick={() => setShowCreationModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            spellCheck="false"
            {...register("title")}
            inputSize="x-large"
          />
        </div>
        <div>
          <label htmlFor="cover_image_url">Cover image</label>
          <Input
            type="text"
            inputSize="x-large"
            {...register("cover_image_url")}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Input inputSize="x-large" {...register("description")} />
        </div>
        <div>
          <label htmlFor="year">Release year</label>
          <Input inputSize="small" type="number" {...register("year")} />
        </div>
        <div>
          <label htmlFor="score">Metacritic score</label>
          <Input inputSize="small" type="number" {...register("score")} />
        </div>
        <div>
          <label htmlFor="trailer_url">Trailer url</label>
          <Input type="text" {...register("trailer_url")} inputSize="x-large" />
        </div>
        <div>
          <label htmlFor="gameplay_url">Gameplay url</label>
          <Input
            type="text"
            {...register("gameplay_url")}
            inputSize="x-large"
          />
        </div>
        {errors.title && (
          <S.FormErrors>{String(errors.title.message)}</S.FormErrors>
        )}
        {errors.cover_image_url && (
          <S.FormErrors>{String(errors.cover_image_url.message)}</S.FormErrors>
        )}
        {errors.description && (
          <S.FormErrors>{String(errors.description.message)}</S.FormErrors>
        )}
        {errors.year && (
          <S.FormErrors>{String(errors.year.message)}</S.FormErrors>
        )}
        {errors.score && (
          <S.FormErrors>{String(errors.score.message)}</S.FormErrors>
        )}
        {errors.trailer_url && (
          <S.FormErrors>{String(errors.trailer_url.message)}</S.FormErrors>
        )}
        {errors.gameplay_url && (
          <S.FormErrors>{String(errors.gameplay_url.message)}</S.FormErrors>
        )}
        <Button type="submit">Submit</Button>
      </S.ModalCreateGame>
    </ModalOverlayCrudBox>
  );
};

export default ModalCreateGame;
