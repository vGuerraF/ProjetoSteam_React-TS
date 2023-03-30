import { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import Profile from "../../types/profiles";
import ToastStyle from "../../types/toastStyle";
import User from "../../types/user";

interface ProfileProviderProps {
  children: ReactNode;
}

interface ProfileProviderData {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  userProfiles: Profile[];
  getUserProfiles: () => void;
}

const ProfileContext = createContext<ProfileProviderData>(
  {} as ProfileProviderData
);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<Profile>({
    gamer_tag: "user",
    id: "12345",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwlW5ATT1jW3e6lwmykJri-0LCOZriL5W1bIYVRab_9w&s",
  });

  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);

  const getUserProfiles = async () => {
    const user: User = JSON.parse(
      localStorage.getItem("steamProjectUser") || "{}"
    );
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    api
      .get(`/user/${user.id}`, headers)
      .then((res) => {
        setUserProfiles(res.data.profiles);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Something went wrong... You will be redirected to login",
          ToastStyle
        );
      });
  };

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, userProfiles, getUserProfiles }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
