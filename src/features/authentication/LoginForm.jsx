import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";

function LoginForm() {
  const { login, isLoading } = useLogin();

  function handleClick() {
    login();
  }

  return (
    <Button onClick={handleClick} size="large">
      {!isLoading ? " Login" : <SpinnerMini />}
    </Button>
  );
}

export default LoginForm;
