import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import headers from "../../api/header";
import { useProfile } from "../../contexts/profile";
import Profile from "../../types/profiles";
import { RoutePath } from "../../types/routes";
import ToastStyle from "../../types/toastStyle";
import Button from "../Button";
import { ModalOverlayCrudBox } from "../ModalOverlay";
import * as S from "./styles";

interface ModalDeleteProfileProps {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentProfile: Profile;
}

const ModalDeleteProfile = ({
  currentProfile,
  setShowDeleteModal,
}: ModalDeleteProfileProps) => {
  const { profile, getUserProfiles } = useProfile();
  const navigate = useNavigate();
  const handleProfileDeletion = () => {
    api
      .delete(`profile/${currentProfile.id}`, headers)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Profile successfully deleted", ToastStyle);
          if (currentProfile.id === profile.id) {
            navigate(RoutePath.PROFILESELECTION);
          } else {
            getUserProfiles();
            setShowDeleteModal(false);
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", ToastStyle);
        console.error(err);
      });
  };
  return (
    <ModalOverlayCrudBox>
      <S.ModalDeleteProfile>
        <section>
          <span>Confirm genre deletion</span>
          <a onClick={() => setShowDeleteModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <span>Do you really want to delete {currentProfile.gamer_tag}?</span>
        </div>
        <div>
          <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button onClick={handleProfileDeletion} specialColor="delete">
            Yes
          </Button>
        </div>
      </S.ModalDeleteProfile>
    </ModalOverlayCrudBox>
  );
};

export default ModalDeleteProfile;
