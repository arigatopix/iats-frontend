import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAccount as changeAccountService } from "../../services/apiAdmin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/session";

export function useChangeAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: changeAccount, isLoading: isChanging } = useMutation({
    mutationFn: ({ employee_id }) => changeAccountService(employee_id),
    onSuccess: user => {
      toast.success("Login สำเร็จ");
      queryClient.invalidateQueries();
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

  return { changeAccount, isChanging };
}
