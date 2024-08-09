import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error,
    isLoading,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, error, isLoading };
}
