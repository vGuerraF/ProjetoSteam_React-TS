import { useState } from "react";
import DefaultContainer from "../../components/DefaultContainer";
import LoginForm from "../../components/LoginForm";

const Login = (props: any) => {
  const [creationMode, setCreationMode] = useState<boolean>(false);

  const handleCreationModeChange = () => {
    setCreationMode(!creationMode);
  };

  return (
    <DefaultContainer light={false}>
      <LoginForm
        creationMode={creationMode}
        handleCreationModeChange={handleCreationModeChange}
      ></LoginForm>
    </DefaultContainer>
  );
};

export default Login;
