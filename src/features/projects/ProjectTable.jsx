import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import ProjectRow from "./ProjectRow";
import { useProjects } from "./useProjects";

function ProjectTable() {
  const { projects, isLoading, error } = useProjects();

  const [searchParams] = useSearchParams();

  // if (isLoading || error) return <Spinner />;

  // if (!tickets.length) return <Empty resourceName="tickets" />;

  // const sortBy = searchParams.get("sortBy") || "date_start-asc";

  // const filterValue = searchParams.get("status") || "all";

  // // TODO ค้นหาชื่อ
  // const searchByName = searchParams.get("name");

  // // FILTER
  // let filteredTickets;
  // if (filterValue === "all") filteredTickets = tickets;
  // if (filterValue === "unconfirmed")
  //   filteredTickets = tickets.filter(ticket => ticket.status !== "confirmed");
  // if (filterValue === "confirmed")
  //   filteredTickets = tickets.filter(ticket => ticket.status === "confirmed");

  // // SORT
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedTickets = filteredTickets.sort((a, b) => {
  //   return (a[field] - b[field]) * modifier;
  // });

  // SEARCH

  return (
    <Menus>
      <Table columns="1fr 4fr 3fr 1fr 1fr">
        <Table.Header>
          <div>เลขที่โครงการ</div>
          <div>ข้อมูลโครงการ</div>
          <div>วันที่เดินทาง</div>
          <div>ประเทศ</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={projects}
          render={project => <ProjectRow key={project.id} project={project} />}
        />
      </Table>
    </Menus>
  );
}

export default ProjectTable;
