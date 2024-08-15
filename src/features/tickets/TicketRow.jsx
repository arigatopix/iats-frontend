import styled from "styled-components";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Tag from "../../ui/Tag";
import { formatDateTH } from "../../utils/helpers";

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
function parseStatus(status) {
  switch (status) {
    case "confirmed":
      return "ยืนยัน";
    default:
      return "รอยืนยัน";
  }
}

function TicketRow({ ticket }) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "silver",
    confirmed: "green",
  };

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
        <Tag type={statusToTagName[status]}>{parseStatus(status)}</Tag>
        <div>
          <Button onClick={() => navigate(`/tickets/${ticketId}`)}>
            แก้ไข
          </Button>
        </div>
      </Table.Row>
    );
  }
}

export default TicketRow;
