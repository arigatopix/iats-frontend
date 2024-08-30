import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject as createProjectService } from "../../services/apiProjects";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createProject, isLoading: isCreating } = useMutation({
    mutationFn: createProjectService,
    onSuccess: () => {
      toast.success("สร้างข้อมูลโครงการสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      navigate("/projects");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createProject, isCreating };
}
