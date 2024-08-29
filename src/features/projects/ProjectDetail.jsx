import { useNavigate, useParams } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import { useProject } from "./useProject";
import Spinner from "../../ui/Spinner";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { project, isLoading, error } = useProject();

  if (isLoading || error) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">หมายเลขโครงการ #{projectId} </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; กลับ</ButtonText>
      </Row>

      <CreateProjectForm projectToEdit={project} />
    </>
  );
}

export default ProjectDetail;
