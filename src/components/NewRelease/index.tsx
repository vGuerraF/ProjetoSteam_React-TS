import Game from "../../types/game";
import * as S from "./styles";

interface NewReleaseProps {
  game: Game;
}

const NewRelease = () => {
  return (
    <S.NewReleaseContainer>
      <img
        src="https://www.amd.com/system/files/2019-10/348038-red-dead-redemption-banner-1920x600.jpg"
        alt={"Red Dead Redemption 2"}
      />
      <div>
        <span>Red Dead Redemption 2</span>
        <p
          title="Winner of over 175 Game of the Year Awards and recipient of over 250
          perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the
          infamous Van der Linde gang, on the run across America at the dawn of
          the modern age. Also includes access to the shared living world of Red
          Dead Online."
        >
          Winner of over 175 Game of the Year Awards and recipient of over 250
          perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the
          infamous Van der Linde gang, on the run across America at the dawn of
          the modern age. Also includes access to the shared living world of Red
          Dead Online.
        </p>
      </div>
    </S.NewReleaseContainer>
  );
};

export default NewRelease;
