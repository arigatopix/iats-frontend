import { useParams } from "react-router-dom";

function TicketDetail() {
  const { ticketId } = useParams();

  return <div>Ticket Detail {ticketId}</div>;
}

export default TicketDetail;
