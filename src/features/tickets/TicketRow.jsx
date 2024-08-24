import styled from "styled-components";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatDateTH } from "../../utils/helpers";
import TicketTagStatus from "./TicketTagStatus";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function TicketRow({ ticket }) {
  const navigate = useNavigate();

  if (ticket) {
    const {
      id: ticketId,
      title,
      first_name: firstName,
      last_name: lastName,
      status,
      projects: {
        name: projectName,
        date_start: dateStart,
        date_end: dateEnd,
        country,
      },
    } = ticket;

    return (
      <Table.Row>
        <div>{ticketId}</div>
        <div>{`${title}${firstName} ${lastName}`}</div>
        <Stacked>
          <span>{`${projectName} `}</span>
          <span>
            {`ระหว่างวันที่ ${formatDateTH(dateStart)}`} &mdash;{" "}
            {`${formatDateTH(dateEnd)}`}
          </span>
        </Stacked>
        <div>{country}</div>
        <TicketTagStatus status={status} />
        <div>
          <Button
            size="small"
            variation="secondary"
            onClick={() => navigate(`/tickets/${ticketId}`)}
          >
            รายละเอียด
          </Button>
        </div>
      </Table.Row>
    );
  }
}

export default TicketRow;
