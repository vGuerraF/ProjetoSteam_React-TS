import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCreateProfile from "../../components/ModalCreateProfile";
import ProfileCard from "../../components/ProfileCard";
import SecondaryContainer from "../../components/SecondaryContainer";
import { useProfile } from "../../contexts/profile";
import { RoutePath } from "../../types/routes";
import * as S from "./styles";

interface ProfileSelectionProps {
  inLightMode: boolean;
}

const ProfileSelection = ({ inLightMode }: ProfileSelectionProps) => {
  const { setProfile, userProfiles, getUserProfiles } = useProfile();

  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserProfiles();
  }, []);

  return (
    <SecondaryContainer light={inLightMode}>
      {showModal && <ModalCreateProfile setShowModal={setShowModal} />}
      <S.TitleProfileSelection>Who is Playing?</S.TitleProfileSelection>
      <S.ContainerProfileSelection>
        <S.CreateProfileCard onClick={() => setShowModal(true)}>
          <div>
            <span>+</span>
          </div>
          <p>Create new Profile</p>
        </S.CreateProfileCard>

        {userProfiles.map((profile) => {
          return (
            <ProfileCard
              onClick={() => {
                setProfile(profile);
                navigate(RoutePath.HOME);
              }}
              profile={profile}
              key={profile.id}
            />
          );
        })}
      </S.ContainerProfileSelection>
    </SecondaryContainer>
  );
};

export default ProfileSelection;
