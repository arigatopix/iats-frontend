import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserService } from "../../services/apiUsers";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ employee_id, user }) => updateUserService(employee_id, user),
    onSuccess: data => {
      toast.success("แก้ไขข้อมูลผู้ใช้งานสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries(["user", data.id.toString()]);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
