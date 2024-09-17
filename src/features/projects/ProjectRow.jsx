import styled from "styled-components";
import Table from "../../ui/Table";
import Stacked from "../../ui/Stacked";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatDateTH } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProject } from "./useDeleteProject";

const WrapButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function ProjectRow({ project }) {
  const navigate = useNavigate();

  const { deleteProject, isDeleting } = useDeleteProject();

  if (project) {
    const {
      id: projectId,
      name: projectName,
      description,
      date_start: dateStart,
      date_end: dateEnd,
      tickets,
      country,
    } = project;

    const numsTicket = tickets.length;

    const numsTicketConfirmed = tickets.filter(
      el => el.status === "confirmed"
    ).length;

    return (
      <Table.Row>
        <div>{projectId}</div>
        <Stacked>
          <span>{projectName}</span>
          <span>{description}</span>
        </Stacked>

        <Stacked>
          {`${formatDateTH(dateStart)}`} &mdash; {`${formatDateTH(dateEnd)}`}
          <span>ประเทศ {country}</span>
        </Stacked>

        <Stacked>
          {numsTicket !== 0 ? (
            <span>{`จำนวนคณะเดินทาง ${numsTicket} คน`}</span>
          ) : (
            <span>&mdash;</span>
          )}
          {numsTicketConfirmed !== 0 ? (
            <span>{`ยืนยันแล้ว ${numsTicketConfirmed} คน`}</span>
          ) : (
            <span>&mdash;</span>
          )}
        </Stacked>

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
                onConfirm={() => deleteProject(projectId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </WrapButton>
      </Table.Row>
    );
  }
}

export default ProjectRow;
