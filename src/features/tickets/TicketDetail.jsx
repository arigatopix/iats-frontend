import { useNavigate, useParams } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import { useTicket } from "./useTicket";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import TicketTagStatus from "./TicketTagStatus";
import ProjectDataBox from "../projects/ProjectDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function TicketDetail() {
  const { ticketId } = useParams();

  const { ticket, isLoading, error } = useTicket();

  const navigate = useNavigate();

  if (isLoading || error) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">
            หมายเลขเดินทาง #{ticketId} &mdash; {ticket.title}
            {ticket.name}
          </Heading>
          <TicketTagStatus status={ticket.status} />
        </HeadingGroup>
        <ButtonText onClick={() => navigate(-1)}>&larr; กลับ</ButtonText>
      </Row>

      <ProjectDataBox project={ticket.project} status={ticket.status} />

      <CreateTicketForm ticketToEdit={ticket} />
    </>
  );
}

export default TicketDetail;
