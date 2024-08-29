import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject as createProjectService } from "../../services/apiProjects";
import toast from "react-hot-toast";

export function useCreateProject() {
  const queryClient = useQueryClient();

  const { mutate: createProject, isLoading: isCreating } = useMutation({
    mutationFn: createProjectService,
    onSuccess: () => {
      toast.success("สร้างข้อมูลโครงการสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createProject, isCreating };
}
