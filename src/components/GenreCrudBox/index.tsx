import { useEffect, useState } from "react";
import { useGenres } from "../../contexts/genres";
import GenreCrudCard from "../GenreCrudCard";
import Input from "../Input";
import ModalCreateGenre from "../ModalCreateGenre";
import * as S from "./styles";

const GenreCrudBox = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { genres, getAllGenres } = useGenres();
  const [filtered, setFiltered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllGenres();
  }, []);

  const handleSearch = () => {
    if (inputValue === "") setFiltered(false);
    setFiltered(true);
  };

  return (
    <>
      {showModal && <ModalCreateGenre setShowModal={setShowModal} />}
      <S.GenreCrudBox>
        <section>
          <div>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setFiltered(false);
              }}
              placeholder="Search genre"
              inputSize="large"
            />
            <a title="Search genre" onClick={handleSearch}>
              <S.SearchIcon />
            </a>
          </div>

          <a title="Add new genre" onClick={() => setShowModal(true)}>
            <S.AddIcon />
          </a>
        </section>

        <div id="genreList">
          {filtered
            ? genres
                .filter((genre) => {
                  return genre.genre_title
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
                })
                .sort((a, b) => a.genre_title.localeCompare(b.genre_title))
                .map((genre) => <GenreCrudCard genre={genre} key={genre.id} />)
            : genres
                .sort((a, b) => a.genre_title.localeCompare(b.genre_title))
                .map((genre) => {
                  return <GenreCrudCard genre={genre} key={genre.id} />;
                })}
        </div>
      </S.GenreCrudBox>
    </>
  );
};

export default GenreCrudBox;
