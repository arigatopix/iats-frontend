import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import ButtonText from "../../ui/ButtonText";

function AddProject() {
  const navigate = useNavigate();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">เพิ่มโครงการ</Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; กลับ</ButtonText>
      </Row>

      <CreateProjectForm />
    </>
  );
}

export default AddProject;
