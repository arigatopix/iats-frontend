import { useMutation } from "@tanstack/react-query";
import { signup as signupService } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    mutate: signup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupService({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully create. Please verify the new user's email address."
      );
    },
    onError: error => {
      console.error(error.message);
      toast.error("Account could not created.");
    },
  });

  return { signup, error, isLoading };
}
