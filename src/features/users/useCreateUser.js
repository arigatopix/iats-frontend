import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserService } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: ({ employee_id, name, email, role }) =>
      createUserService({ employee_id, name, email, role }),
    onSuccess: data => {
      toast.success("สร้างผู้ใช้งานสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createUser, isCreating };
}
