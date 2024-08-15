import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { projectId } = useParams();

  return <div>project Detail {projectId}</div>;
}

export default ProjectDetail;
