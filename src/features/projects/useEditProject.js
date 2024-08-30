import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject as editProjectService } from "../../services/apiProjects";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editProject, isLoading: isEditing } = useMutation({
    mutationFn: ({ project, editId }) =>
      editProjectService({ project, editId }),
    onSuccess: data => {
      toast.success("แก้ไขข้อมูลโครงการสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.setQueryData(["project", data.id.toString()], data);

      navigate("/projects");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { editProject, isEditing };
}
