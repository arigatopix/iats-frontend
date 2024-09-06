import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useTickets } from "./useTickets";
import TicketRow from "./TicketRow";
import { searchBy } from "../../utils/helpers";
import { roles } from "../../utils/roles";
import { useUser } from "../authentication/useUser";

function TicketTable() {
  const { tickets, isLoading, error } = useTickets();

  const {
    user: { role },
  } = useUser();

  const [searchParams] = useSearchParams();

  if (isLoading || error) return <Spinner />;

  if (!tickets.length) return <Empty resourceName="tickets" />;

  const sortBy = searchParams.get("sortBy") || "date_start-asc";

  const filterValue = searchParams.get("status") || "all";

  const searchTerm = searchParams.get("name");

  // FILTER
  let filteredTickets;
  if (filterValue === "all") filteredTickets = tickets;
  if (filterValue === "unconfirmed")
    filteredTickets = tickets.filter(ticket => ticket.status !== "confirmed");
  if (filterValue === "confirmed")
    filteredTickets = tickets.filter(ticket => ticket.status === "confirmed");

  // SORT
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedTickets = filteredTickets.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  // SEARCH
  const searched = searchTerm
    ? searchBy(sortedTickets, "name", searchTerm)
    : sortedTickets;

  return (
    <Menus>
      <Table
        columns={
          roles.includes(role)
            ? "0.6fr 1fr 2.2fr 1fr 1fr 1fr"
            : "0.6fr 2.2fr 1fr 1fr 1fr"
        }
      >
        <Table.Header>
          <div>เลขที่เดินทาง</div>
          {roles.includes(role) && <div>ชื่อผู้เดินทาง</div>}
          <div>ข้อมูลโครงการ</div>
          <div>ประเทศ</div>
          <div>สถานะ</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={searched}
          render={ticket => <TicketRow key={ticket.id} ticket={ticket} />}
        />
      </Table>
    </Menus>
  );
}

export default TicketTable;
