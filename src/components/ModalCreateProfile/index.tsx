import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import api from "../../api";
import { useProfile } from "../../contexts/profile";
import ToastStyle from "../../types/toastStyle";
import User from "../../types/user";
import Button from "../Button";
import { Input } from "../Input/styles";
import { ModalOverlay } from "../ModalOverlay";
import * as S from "./styles";

interface ModalCreateProfileProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const createProfileSchema = yup.object().shape({
  gamer_tag: yup
    .string()
    .min(5, "Gamer tag is too short")
    .max(50, "Gamer tag is too long")
    .required("Gamer tag field is required"),
  image_url: yup
    .string()
    .url("Profile picture must be an url")
    .required("Profile picture is required"),
});

const ModalCreateProfile = ({ setShowModal }: ModalCreateProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createProfileSchema) });

  const { getUserProfiles } = useProfile();

  const handleProfileCreation = ({ gamer_tag, image_url }: any) => {
    const user: User = JSON.parse(
      localStorage.getItem("steamProjectUser") || "{}"
    );
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    const userCreationData = { gamer_tag, image_url, user_owner_id: user.id };
    api
      .post("/profile", userCreationData, headers)
      .then(() => {
        getUserProfiles();
        setShowModal(false);
        toast.success("Profile successfully created", ToastStyle);
      })
      .catch((err) => {
        if (err.response.status === 422)
          toast.error("Gamer tag already in use", ToastStyle);
        console.error(err);
      });
  };

  return (
    <ModalOverlay>
      <S.ModalCreateProfile onSubmit={handleSubmit(handleProfileCreation)}>
        <section>
          <span>Create new profile</span>
          <a onClick={() => setShowModal(false)}>
            <S.CloseModalIcon />
          </a>
        </section>
        <div>
          <label htmlFor="gamer_tag">Gamer tag</label>
          <Input type="text" {...register("gamer_tag")} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="image_url">Profile picture</label>
          <Input type="text" {...register("image_url")} autoComplete="off" />
        </div>
        {errors.gamer_tag && (
          <S.FormErrors>{String(errors.gamer_tag.message)}</S.FormErrors>
        )}
        {errors.image_url && (
          <S.FormErrors>{String(errors.image_url.message)}</S.FormErrors>
        )}
        <Button type="submit">Create Profile</Button>
      </S.ModalCreateProfile>
    </ModalOverlay>
  );
};

export default ModalCreateProfile;
