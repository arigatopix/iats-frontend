import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "../../services/apiAuth";
import { baseURL } from "../../services/axios";

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error,
    isLoading,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      window.location.href = `${baseURL}/auth/logout`;

      queryClient.removeQueries();
    },
  });

  return { logout, error, isLoading };
}
