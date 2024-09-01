import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "../../services/apiAuth";
import { keycloakLogoutURL } from "../../services/axios";

export function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error,
    isLoading,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      window.location.href = `${keycloakLogoutURL}`;

      queryClient.removeQueries();
    },
  });

  return { logout, error, isLoading };
}
