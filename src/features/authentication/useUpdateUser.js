import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserService } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    error,
    isLoading,
  } = useMutation({
    mutationFn: updateCurrentUserService,
    onSuccess: () => {
      toast.success("User account successfully updated.");
      queryClient.invalidateQueries(["user"]);
    },
    onError: error => {
      console.error(error.message);
      toast.error("User account update fail.");
    },
  });

  return { updateUser, error, isLoading };
}
