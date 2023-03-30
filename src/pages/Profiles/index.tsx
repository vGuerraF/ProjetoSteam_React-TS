import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import headers from "../../api/header";
import Button from "../../components/Button";
import ConfigContentBox from "../../components/ConfigContentBox";
import ContentBox from "../../components/ContentBox";
import Footer from "../../components/Footer";
import HomeHeading from "../../components/HomeHeading";
import { Input } from "../../components/Input/styles";
import ModalDeleteProfile from "../../components/ModalDeleteProfile";
import NavBar from "../../components/NavBar";
import ProfileCard from "../../components/ProfileCard";
import SecondaryContainer from "../../components/SecondaryContainer";
import { useProfile } from "../../contexts/profile";
import Profile from "../../types/profiles";
import { RoutePath } from "../../types/routes";
import ToastStyle from "../../types/toastStyle";
import * as S from "./styles";

const Profiles = (props: any) => {
  const { userProfiles, profile, getUserProfiles, setProfile } = useProfile();
  const [currentProfile, setCurrentProfile] = useState<Profile>(profile);
  const [inputsValues, setInputsValues] = useState({
    gamer_tag: "",
    image_url: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleGamertagEdit = () => {
    if (currentProfile.gamer_tag === inputsValues.gamer_tag) return;
    const dto = { gamer_tag: inputsValues.gamer_tag };
    api
      .patch(`/profile/${currentProfile.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Gamer tag successfully updated", ToastStyle);
          getUserProfiles();
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          toast.error("Gamertag already taken", ToastStyle);
        } else {
          toast.error("Something went wrong...", ToastStyle);
        }
        console.error(err);
      });
  };

  const handleProfilePicEdit = () => {
    if (currentProfile.image_url === inputsValues.image_url) return;
    const dto = { image_url: inputsValues.image_url };
    api
      .patch(`/profile/${currentProfile.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Gamer tag successfully updated", ToastStyle);
          getUserProfiles();
          if (res.data.id === profile.id) {
            setProfile(res.data);
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong...", ToastStyle);
        console.error(err);
      });
  };

  return (
    <SecondaryContainer light={false}>
      <NavBar
        currentPage={{
          admin: false,
          home: false,
          profiles: true,
          settings: false,
        }}
      />

      <ContentBox>
        <HomeHeading>Profiles settings</HomeHeading>
        <ConfigContentBox>
          {showDeleteModal && (
            <ModalDeleteProfile
              currentProfile={currentProfile}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
          <S.ProfileOptionContainer>
            {userProfiles.map((profile) => {
              return (
                <ProfileCard
                  profile={profile}
                  onClick={() => setCurrentProfile(profile)}
                  active={currentProfile === profile}
                />
              );
            })}
          </S.ProfileOptionContainer>
          <S.ProfileForm>
            <form>
              <label htmlFor="">Gamertag</label>
              <Input
                inputSize="large"
                placeholder={currentProfile.gamer_tag}
                value={inputsValues.gamer_tag}
                onChange={(e) =>
                  setInputsValues({
                    ...inputsValues,
                    gamer_tag: e.target.value,
                  })
                }
              />
              <a
                onClick={() => {
                  handleGamertagEdit();
                }}
              >
                <S.SendIcon />
              </a>
            </form>
            <form>
              <label htmlFor="">Profile picture</label>
              <Input
                inputSize="large"
                placeholder={currentProfile.image_url}
                value={inputsValues.image_url}
                onChange={(e) =>
                  setInputsValues({
                    ...inputsValues,
                    image_url: e.target.value,
                  })
                }
              />
              <a
                onClick={() => {
                  handleProfilePicEdit();
                }}
              >
                <S.SendIcon />
              </a>
            </form>
            <div>
              <Button
                specialColor="delete"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Profile
              </Button>
              <Button
                specialColor="purple"
                onClick={() => navigate(RoutePath.PROFILESELECTION)}
              >
                Change Profile
              </Button>
            </div>
          </S.ProfileForm>
        </ConfigContentBox>
      </ContentBox>
      <Footer />
    </SecondaryContainer>
  );
};

export default Profiles;
