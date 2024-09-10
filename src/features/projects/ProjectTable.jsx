import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import ProjectRow from "./ProjectRow";
import { useProjects } from "./useProjects";
import Pagination from "../../ui/Pagination";

function ProjectTable() {
  const { data, isLoading, error } = useProjects();

  if (isLoading || error) return <Spinner />;

  const { projects, total } = data;

  if (!projects.length) return <Empty resourceName="projects" />;

  return (
    <>
      <Table columns="1fr 4fr 3fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>เลขที่โครงการ</div>
          <div>ข้อมูลโครงการ</div>
          <div>วันที่เดินทาง</div>
          <div>ประเทศ</div>
          <div>จำนวนคณะเดินทาง</div>
          <div>จำนวนคณะเดินทางที่ยืนยันแล้ว</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={projects}
          render={project => <ProjectRow key={project.id} project={project} />}
        />

        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default ProjectTable;
