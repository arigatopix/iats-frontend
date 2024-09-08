import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteUser as deleteUserService } from "../../services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      toast.success("ลบข้อมูลสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteUser, isDeleting };
}
