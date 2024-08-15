import styled from "styled-components";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatDateTH } from "../../utils/helpers";

const WrapButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

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

function ProjectRow({ project }) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "silver",
    confirmed: "green",
  };

  if (project) {
    const {
      id: projectId,
      name: projectName,
      description,
      date_start: dateStart,
      date_end: dateEnd,

      country,
    } = project;

    return (
      <Table.Row>
        <div>{projectId}</div>
        <Stacked>
          <span>{projectName}</span>
          <span>{description}</span>
        </Stacked>

        <div>
          {`${formatDateTH(dateStart)}`} &mdash; {`${formatDateTH(dateEnd)}`}
        </div>

        <div>{country}</div>
        <WrapButton>
          <Button
            size="small"
            variation="secondary"
            onClick={() => navigate(`${projectId}`)}
          >
            แก้ไข
          </Button>
          <Button size="small" variation="danger" onClick={() => {}}>
            ลบ
          </Button>
        </WrapButton>
      </Table.Row>
    );
  }
}

export default ProjectRow;
