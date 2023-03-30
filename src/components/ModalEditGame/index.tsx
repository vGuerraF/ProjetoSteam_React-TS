import Game from "../../types/game";
import * as S from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useGames } from "../../contexts/games";
import { ModalOverlayCrudBox } from "../ModalOverlay";
import Button from "../Button";
import { Input } from "../Input/styles";
import api from "../../api";
import headers from "../../api/header";
import { useGenres } from "../../contexts/genres";
import toast from "react-hot-toast";
import ToastStyle from "../../types/toastStyle";
import { useState } from "react";
import GenreCard from "../GameEditionGenreCard";

interface ModalEditGameProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  game: Game;
}

const editGameSchema = yup.object().shape({
  title: yup.string().max(100, "Game title is too long"),
  cover_image_url: yup.string().url("Cover image must be an url"),
  description: yup.string().max(300, "Description is too long"),
  year: yup.string(),
  score: yup.string(),
  trailer_url: yup.string().url("Trailer must be an url"),
  gameplay_url: yup.string().url("Gameplay must be an url"),
});

const ModalEditGame = ({ game, setShowEditModal }: ModalEditGameProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editGameSchema) });
  const { getAllGames } = useGames();
  const { genres } = useGenres();
  const getGenresIds = (): number[] => {
    const gameGenres = game.genres;
    const array: number[] = [];
    gameGenres.forEach((gameGenre) => {
      genres.forEach((genre) => {
        if (genre.genre_title === gameGenre.genre_title) {
          array.push(genre.id);
        }
      });
    });

    return array;
  };
  const [selectedGenres, setSelectedGenres] = useState<number[]>(getGenresIds);

  const handleSetGenres = () => {
    const dto = { genres: selectedGenres };
    api
      .patch(`game/updateGenres/${game.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Genres attached to game", ToastStyle);
          setShowEditModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong...", ToastStyle);
        setShowEditModal(false);
      });
  };

  const handleGameEdition = ({
    title,
    cover_image_url,
    description,
    year,
    score,
    trailer_url,
    gameplay_url,
  }: any) => {
    const dtoGameEdition: Partial<Game> = {
      title: title || game.title,
      cover_image_url: cover_image_url || game.cover_image_url,
      description: description || game.description,
      year: year || game.year,
      score: score || game.score,
      gameplay_url: gameplay_url || game.gameplay_url,
      trailer_url: trailer_url || game.trailer_url,
    };
    api
      .patch(`/game/${game.id}`, dtoGameEdition, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Game successfully edited", ToastStyle);
          getAllGames();
          setShowEditModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 422) {
          toast.error("Title already exists", ToastStyle);
        } else {
          toast.error("Something went wrong...", ToastStyle);
        }
      });
  };

  return (
    <ModalOverlayCrudBox>
      <S.ModalEditGame>
        <form onSubmit={handleSubmit(handleGameEdition)}>
          <section>
            <span>Edit game</span>
            <a onClick={() => setShowEditModal(false)}>
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
              placeholder={game.title}
            />
          </div>
          <div>
            <label htmlFor="cover_image_url">Cover image</label>
            <Input
              type="text"
              inputSize="x-large"
              {...register("cover_image_url")}
              placeholder={game.cover_image_url}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input
              inputSize="x-large"
              {...register("description")}
              placeholder={game.description}
            />
          </div>
          <div>
            <label htmlFor="year">Release year</label>
            <Input
              inputSize="small"
              type="number"
              {...register("year")}
              placeholder={String(game.year)}
            />
          </div>
          <div>
            <label htmlFor="score">Metacritic score</label>
            <Input
              inputSize="small"
              type="number"
              {...register("score")}
              placeholder={String(game.score)}
            />
          </div>
          <div>
            <label htmlFor="trailer_url">Trailer url</label>
            <Input
              type="text"
              {...register("trailer_url")}
              inputSize="x-large"
              placeholder={game.trailer_url}
            />
          </div>
          <div>
            <label htmlFor="gameplay_url">Gameplay url</label>
            <Input
              type="text"
              {...register("gameplay_url")}
              inputSize="x-large"
              placeholder={game.gameplay_url}
            />
          </div>
          {errors.title && (
            <S.FormErrors>{String(errors.title.message)}</S.FormErrors>
          )}
          {errors.cover_image_url && (
            <S.FormErrors>
              {String(errors.cover_image_url.message)}
            </S.FormErrors>
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
          <Button type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </form>
        <section>
          <span>Set genres</span>
        </section>
        {genres.map((genre) => {
          return (
            <GenreCard
              genre={genre}
              key={genre.id}
              setSelectedGenres={setSelectedGenres}
              selectedGenres={selectedGenres}
            />
          );
        })}
        <Button onClick={() => handleSetGenres()}>Set genres</Button>
      </S.ModalEditGame>
    </ModalOverlayCrudBox>
  );
};

export default ModalEditGame;
