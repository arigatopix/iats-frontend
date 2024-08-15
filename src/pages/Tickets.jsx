import TicketTable from "../features/tickets/TicketTable";
import TicketTableOperations from "../features/tickets/TicketTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Tickets() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">ข้อมูลผู้เดินทาง</Heading>
        <TicketTableOperations />
      </Row>
      <Row>
        <TicketTable />
      </Row>
    </>
  );
}

export default Tickets;
