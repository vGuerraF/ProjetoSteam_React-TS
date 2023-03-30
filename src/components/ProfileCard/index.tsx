import { AnchorHTMLAttributes } from "react";
import Profile from "../../types/profiles";
import * as S from "./styles";

interface ProfileCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  profile: Profile;
  onClick: () => void;
  active?: boolean;
}

const ProfileCard = ({ profile, ...props }: ProfileCardProps) => {
  return (
    <S.ProfileCard {...props}>
      <img src={profile.image_url} alt="" />
      <p>{profile.gamer_tag}</p>
    </S.ProfileCard>
  );
};

export default ProfileCard;
