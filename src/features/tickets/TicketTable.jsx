import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useTickets } from "./useTickets";
import TicketRow from "./TicketRow";
import { roles } from "../../utils/roles";
import { useUser } from "../authentication/useUser";
import Pagination from "../../ui/Pagination";

function TicketTable() {
  const { data, isLoading, error } = useTickets();

  const {
    user: { role },
  } = useUser();

  if (isLoading || error) return <Spinner />;

  const { tickets, total } = data;

  if (!tickets.length) return <Empty resourceName="tickets" />;

  return (
    <>
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
          data={tickets}
          render={ticket => <TicketRow key={ticket.id} ticket={ticket} />}
        />

        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default TicketTable;
