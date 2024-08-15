import ProjectTable from "../features/projects/ProjectTable";
import ProjectTableOperations from "../features/projects/ProjectTableOperations";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Projects() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">จัดการโครงการ</Heading>
        <ProjectTableOperations />
      </Row>
      <Row>
        <ProjectTable />
      </Row>
    </>
  );
}

export default Projects;
