import { useState } from "react";
import Genre from "../../types/genres";
import * as S from "./styles";

interface GenreCardProps {
  genre: Genre;
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
}

const GenreCard = ({
  genre,
  selectedGenres,
  setSelectedGenres,
}: GenreCardProps) => {
  const [selected, setSelected] = useState<boolean>(
    selectedGenres.some((elem) => elem === genre.id)
  );

  return (
    <S.GenreCard>
      <p>{genre.genre_title}</p>
      <a
        onClick={
          selected
            ? () => {
                setSelectedGenres(
                  selectedGenres.filter((elem) => {
                    return elem != genre.id;
                  })
                );
                setSelected(false);
              }
            : () => {
                setSelectedGenres([...selectedGenres, genre.id]);
                setSelected(true);
              }
        }
      >
        {selected ? <S.RemoveIcon /> : <S.AddIcon />}
      </a>
    </S.GenreCard>
  );
};

export default GenreCard;
