import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteProject as deleteProjectService } from "../../services/apiProjects";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProjectService,
    onSuccess: () => {
      toast.success("ลบข้อมูลสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteProject, isDeleting };
}
