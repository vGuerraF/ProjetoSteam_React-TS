import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import api from "../../api";
import { useAuth } from "../../contexts/auth";
import ToastStyle from "../../types/toastStyle";
import Button from "../Button";
import { Input } from "../Input/styles";
import { LogoForLogin } from "../Logo/styles";
import * as S from "./styles";

interface LoginFormProps {
  creationMode: boolean;
  handleCreationModeChange: () => void;
}

interface handleLoginParams {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Incorrect email format").required(),
  password: yup
    .string()
    .max(32, "Password is too long")
    .min(8, "Password is too short")
    .required(),
});

const userCreationSchema = yup.object().shape({
  email: yup.string().email("Incorrect email format").required(),
  password: yup
    .string()
    .max(32, "Password is too long")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Your password must contain at least 1 upper case, 1 lower case and 1 special character [!@#$%^&*]"
    )
    .required(),
  confirm_password: yup
    .string()
    .max(32, "Passwords must be equal")
    .min(8, "Passwords must be equal")
    .required(),
  user_name: yup
    .string()
    .min(3, "User name is too short")
    .max(30, "User name is too long")
    .required(),
  cpf: yup
    .string()
    .matches(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "CPF must obbey cpf format. Ex: 12345678900"
    )
    .required(),
  admin_pass: yup.string().max(50),
});

const LoginForm = ({
  creationMode,
  handleCreationModeChange,
}: LoginFormProps) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const userCreationProviders = useForm({
    resolver: yupResolver(userCreationSchema),
  });
  const userCreationRegister = userCreationProviders.register;
  const userCreationHandleSubmit = userCreationProviders.handleSubmit;
  const userCreationFormState = userCreationProviders.formState;
  const userCreationErrors = userCreationFormState.errors;

  const handleUserCreation = (data: any) => {
    const userCreationInfo = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      is_admin: data.admin_pass === 'secretPassForAdmin',
      cpf: data.cpf,
    };

    api
      .post("/user", userCreationInfo)
      .then((res) => {
        if (res.status === 201)
          toast.success(
            `Hello, ${res.data.user_name}, your account was successfully created !`,
            ToastStyle
          );
        handleCreationModeChange();
      })
      .catch((err) => {
        toast.error("Something went wrong...", ToastStyle);
        console.error(err);
      });
  };

  const handleLogin = (data: any) => {
    const loginInfo: handleLoginParams = {
      email: data.email,
      password: data.password,
    };
    api
      .post("/auth", loginInfo)
      .then((res) => {
        if (res.status === 201) {
          login({ token: res.data.token, user: res.data.user });
        }
      })
      .catch((err) => {
        err.response.status === 401
          ? toast.error(err.response.data.message, ToastStyle)
          : console.error(err);
      });
  };

  return (
    <>
      {creationMode ? (
        <S.LoginForm onSubmit={userCreationHandleSubmit(handleUserCreation)}>
          <section>
            <LogoForLogin />
            <span>Steam Project</span>
          </section>
          <div id="inputFields">
            <div className="InputField">
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                inputSize="large"
                {...userCreationRegister("email")}
              />
            </div>

            <div className="InputField">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                inputSize="large"
                {...userCreationRegister("password")}
              />
            </div>

            <div className="InputField">
              <label htmlFor="password">Confirm Password</label>
              <Input
                type="password"
                inputSize="large"
                {...userCreationRegister("confirm_password")}
              />
            </div>

            <div className="InputField">
              <label htmlFor="user_name">User Name</label>
              <Input
                type="text"
                inputSize="large"
                {...userCreationRegister("user_name")}
              />
            </div>

            <div className="InputField">
              <label htmlFor="cpf">CPF</label>
              <Input
                type="number"
                inputSize="large"
                {...userCreationRegister("cpf")}
              />
            </div>

            <div>
              <label htmlFor="admPass">Manager Password</label>
              <Input
                type="password"
                inputSize="large"
                {...userCreationRegister("admin_pass")}
              />
            </div>

            {userCreationErrors.email && (
              <S.FormErrors>
                {String(userCreationErrors.email.message)}
              </S.FormErrors>
            )}
            {userCreationErrors.password && (
              <S.FormErrors>
                {String(userCreationErrors.password.message)}
              </S.FormErrors>
            )}
            {userCreationErrors.confirm_password && (
              <S.FormErrors>
                {String(userCreationErrors.confirm_password.message)}
              </S.FormErrors>
            )}
            {userCreationErrors.user_name && (
              <S.FormErrors>
                {String(userCreationErrors.user_name.message)}
              </S.FormErrors>
            )}
            {userCreationErrors.cpf && (
              <S.FormErrors>
                {String(userCreationErrors.cpf.message)}
              </S.FormErrors>
            )}
            {userCreationErrors.admin_pass && (
              <S.FormErrors>
                {String(userCreationErrors.admin_pass.message)}
              </S.FormErrors>
            )}

            <div id="formBtns">
              <Button onClick={() => handleCreationModeChange()}>
                Go Back
              </Button>
              <Button type="submit">Sign Up</Button>
            </div>
          </div>
        </S.LoginForm>
      ) : (
        <S.LoginForm onSubmit={handleSubmit(handleLogin)}>
          <section>
            <LogoForLogin />
            <span>Steam Project</span>
          </section>
          <div id="inputFields">
            <div className="InputField">
              <label htmlFor="email">E-mail</label>
              <Input type="text" inputSize="large" {...register("email")} />
            </div>

            <div className="InputField">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                inputSize="large"
                {...register("password")}
              />
            </div>

            {errors.email && (
              <S.FormErrors>{String(errors.email.message)}</S.FormErrors>
            )}
            {errors.password && (
              <S.FormErrors>{String(errors.password.message)}</S.FormErrors>
            )}

            <div id="formBtns">
              <Button onClick={() => handleCreationModeChange()}>
                {creationMode ? "Go Back" : "Don't have an account yet?"}
              </Button>
              <Button type="submit">Sign In</Button>
            </div>
          </div>
        </S.LoginForm>
      )}
    </>
  );
};

export default LoginForm;
