import { useEffect, useState } from "react";
import { useGames } from "../../contexts/games";
import GameCrudCard from "../GameCrudCard";
import Input from "../Input";
import ModalCreateGame from "../ModalCreateGame";
import * as S from "./styles";

const GameCrudBox = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { games, getAllGames } = useGames();
  const [filtered, setFiltered] = useState(false);
  const [showCreationModal, setShowCreationModal] = useState(false);

  useEffect(() => {
    getAllGames();
  }, []);

  const handleSearch = () => {
    if (inputValue === "") setFiltered(false);
    setFiltered(true);
  };

  return (
    <S.GameCrudBox>
      {showCreationModal && (
        <ModalCreateGame setShowCreationModal={setShowCreationModal} />
      )}
      <section>
        <div>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setFiltered(false);
            }}
            placeholder="Search game"
            inputSize="large"
          />
          <a title="Search game" onClick={handleSearch}>
            <S.SearchIcon />
          </a>
        </div>

        <a title="Add new game" onClick={() => setShowCreationModal(true)}>
          <S.AddIcon />
        </a>
      </section>

      <div id="gameList">
        {filtered
          ? games
              .filter((game) => {
                return game.title
                  .toLowerCase()
                  .includes(inputValue.toLowerCase());
              })
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((game) => <GameCrudCard game={game} key={game.id} />)
          : games
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((game) => <GameCrudCard game={game} key={game.id} />)}
      </div>
    </S.GameCrudBox>
  );
};

export default GameCrudBox;
