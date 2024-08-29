import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getProject } from "../../services/apiProjects";

export function useProject() {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    retry: false,
  });

  return { project, isLoading, error };
}
