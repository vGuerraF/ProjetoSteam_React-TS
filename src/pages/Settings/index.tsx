import { useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import headers from "../../api/header";
import ConfigContentBox from "../../components/ConfigContentBox";
import ContentBox from "../../components/ContentBox";
import Footer from "../../components/Footer";
import HomeHeading from "../../components/HomeHeading";
import Input from "../../components/Input";
import NavBar from "../../components/NavBar";
import OptionsList from "../../components/OptionsList";
import SecondaryContainer from "../../components/SecondaryContainer";
import { useAuth } from "../../contexts/auth";
import ToastStyle from "../../types/toastStyle";
import User from "../../types/user";
import * as S from "./styles";

interface userEditInputs {
  email: string;
  password: string;
  confirm_password: string;
  user_name: string;
  cpf: string;
  adm_password: string;
}

const Settings = (props: any) => {
  const options = ["User information"];
  const [currentManager, setCurrentManager] = useState<string>(options[0]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const { logout, login } = useAuth();

  const user: User = JSON.parse(
    localStorage.getItem("steamProjectUser") || "{}"
  );

  const [inputsValues, setInputsValues] = useState<userEditInputs>({
    email: user.email,
    password: "",
    confirm_password: "",
    user_name: user.user_name,
    cpf: user.cpf,
    adm_password: "",
  });

  const handleEmailEdit = () => {
    if (user.email === inputsValues.email) return;
    const dto = { email: inputsValues.email };
    api
      .patch(`/user/${user.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Email successfully changed", ToastStyle);
          logout("Please, log in again with your new email.");
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
        if (err.response.status === 422) {
          toast.error("Email already in use", ToastStyle);
        } else {
          toast.error("Something went wrong...", ToastStyle);
        }
      });
  };

  const handleUserNameEdit = () => {
    if (user.user_name === inputsValues.user_name) return;
    const dto = { user_name: inputsValues.user_name };
    api
      .patch(`/user/${user.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User name successfully changed", ToastStyle);
          const newUser: User = { ...user, user_name: inputsValues.user_name };
          login({
            token: localStorage.getItem("steamProjectToken") || "",
            user: newUser,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
        toast.error("Something went wrong...", ToastStyle);
      });
  };

  const handleCpfEdit = () => {
    if (user.cpf === inputsValues.cpf) return;
    const dto = { cpf: inputsValues.cpf };
    api
      .patch(`/user/${user.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("CPF successfully changed", ToastStyle);
          const newUser: User = { ...user, cpf: inputsValues.cpf };
          login({
            token: localStorage.getItem("steamProjectToken") || "",
            user: newUser,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
        toast.error("Something went wrong...", ToastStyle);
      });
  };

  const handlePasswordEdit = () => {
    if (
      !inputsValues.password ||
      !inputsValues.confirm_password ||
      inputsValues.password != inputsValues.confirm_password
    ) {
      setShowAlert(true);
      return;
    }
    const dto = {
      password: inputsValues.password,
      confirm_password: inputsValues.confirm_password,
    };
    api
      .patch(`/user/${user.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password successfully changed", ToastStyle);
          logout("Please, log in again with your new password.");
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
        toast.error("Something went wrong...", ToastStyle);
      });
  };

  const handleAdminPassEdit = () => {
    if (inputsValues.adm_password != "secretPassForAdmin") {
      toast.error("Incorrect administrator password", ToastStyle);
      return;
    }
    const dto = {
      is_admin: true,
    };
    api
      .patch(`/user/${user.id}`, dto, headers)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Administrator permit granted", ToastStyle);
          const newUser: User = { ...user, is_admin: true };
          login({
            token: localStorage.getItem("steamProjectToken") || "",
            user: newUser,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
        toast.error("Something went wrong...", ToastStyle);
      });
  };

  return (
    <SecondaryContainer light={false}>
      <NavBar
        currentPage={{
          home: false,
          admin: false,
          profiles: false,
          settings: true,
        }}
      />

      <ContentBox>
        <HomeHeading>User Settings</HomeHeading>
        <ConfigContentBox>
          <OptionsList
            options={options}
            currentManager={currentManager}
            setCurrentManager={setCurrentManager}
          />
          {currentManager === "User information" && (
            <S.UserForm>
              <form>
                <label htmlFor="">E-mail</label>
                <Input
                  inputSize="x-large"
                  placeholder="Change user email"
                  value={inputsValues.email}
                  onChange={(e) =>
                    setInputsValues({ ...inputsValues, email: e.target.value })
                  }
                />
                <a onClick={handleEmailEdit}>
                  <S.SendIcon />
                </a>
              </form>
              {showAlert && (
                <span>
                  <FiAlertTriangle /> Must be a valid and avaliable e-mail
                </span>
              )}

              <form>
                <label htmlFor="">User Name</label>
                <Input
                  inputSize="x-large"
                  placeholder="Change user name"
                  value={inputsValues.user_name}
                  onChange={(e) =>
                    setInputsValues({
                      ...inputsValues,
                      user_name: e.target.value,
                    })
                  }
                />
                <a onClick={handleUserNameEdit}>
                  <S.SendIcon />
                </a>
              </form>
              {showAlert && (
                <span>
                  <FiAlertTriangle /> Must be at least 3 and at max 30
                  characters long
                </span>
              )}

              <form>
                <label htmlFor="">CPF</label>
                <Input
                  inputSize="x-large"
                  placeholder="Change CPF"
                  value={inputsValues.cpf}
                  onChange={(e) =>
                    setInputsValues({ ...inputsValues, cpf: e.target.value })
                  }
                />
                <a onClick={handleCpfEdit}>
                  <S.SendIcon />
                </a>
              </form>
              {showAlert && (
                <span>
                  <FiAlertTriangle /> Must be avaliable and have 11 characters
                  long string of numbers
                </span>
              )}

              <form>
                <label htmlFor="">Password</label>
                <Input
                  type="password"
                  inputSize="small"
                  placeholder="Change password"
                  value={inputsValues.password}
                  onChange={(e) =>
                    setInputsValues({
                      ...inputsValues,
                      password: e.target.value,
                    })
                  }
                />

                <label htmlFor="">Confirm Password</label>
                <Input
                  type="password"
                  inputSize="small"
                  placeholder="Confirm password"
                  value={inputsValues.confirm_password}
                  onChange={(e) =>
                    setInputsValues({
                      ...inputsValues,
                      confirm_password: e.target.value,
                    })
                  }
                />
                <a onClick={handlePasswordEdit}>
                  <S.SendIcon />
                </a>
              </form>
              {showAlert && (
                <span>
                  <FiAlertTriangle /> Must be between 8 and 32 characters long
                  and include at least one of each: Lower case, Upper case,
                  number and special character [!@#$%^&*]
                </span>
              )}

              <form>
                <label htmlFor="">Manager Password</label>
                <Input
                  type="password"
                  inputSize="x-large"
                  placeholder="Manager password"
                  value={inputsValues.adm_password}
                  onChange={(e) =>
                    setInputsValues({
                      ...inputsValues,
                      adm_password: e.target.value,
                    })
                  }
                />
                <a onClick={handleAdminPassEdit}>
                  <S.SendIcon />
                </a>
              </form>
              {showAlert && (
                <span>
                  <FiAlertTriangle /> Secret manager password
                </span>
              )}
            </S.UserForm>
          )}
        </ConfigContentBox>
      </ContentBox>
      <Footer />
    </SecondaryContainer>
  );
};

export default Settings;
