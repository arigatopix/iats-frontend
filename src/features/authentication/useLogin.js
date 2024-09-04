import { useMutation } from "@tanstack/react-query";
import { login as loginService } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginService,
    onSuccess: () => {},
    onError: error => {
      console.log(error.message);
      toast.error("Login");
    },
  });

  return { login, isLoading };
}

export default useLogin;
