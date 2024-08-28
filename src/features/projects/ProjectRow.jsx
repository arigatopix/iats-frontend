import styled from "styled-components";
import Table from "../../ui/Table";
import Stacked from "../../ui/Stacked";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatDateTH } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const WrapButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function ProjectRow({ project }) {
  const navigate = useNavigate();

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

          <Modal>
            <Modal.Open opens={`delete-${projectId}`}>
              <Button size="small" variation="danger">
                ลบ
              </Button>
            </Modal.Open>

            <Modal.Window name={`delete-${projectId}`}>
              <ConfirmDelete
                resourceName="โครงการ"
                onConfirm={() => console.log(projectId)}
                disabled={false}
              />
            </Modal.Window>
          </Modal>
        </WrapButton>
      </Table.Row>
    );
  }
}

export default ProjectRow;
