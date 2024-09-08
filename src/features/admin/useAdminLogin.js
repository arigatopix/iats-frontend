import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminLogin as adminLoginService } from "../../services/apiAdmin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/session";

export function useAdminLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: adminLogin, isLoading: isLogginIn } = useMutation({
    mutationFn: ({ employee_id }) => adminLoginService(employee_id),
    onSuccess: user => {
      toast.success("Login สำเร็จ");
      queryClient.setQueryData(["user"], prevUser => {
        setToken(user.token);
        return { ...prevUser, ...user };
      });

      navigate("/tickets");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { adminLogin, isLogginIn };
}
