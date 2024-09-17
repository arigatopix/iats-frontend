import React from "react";
import FormHeader from "../../ui/FormHeader";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import Stacked from "../../ui/Stacked";
import TicketTagStatus from "../tickets/TicketTagStatus";
import styled from "styled-components";
import { useFieldArray } from "react-hook-form";
import Modal from "../../ui/Modal";
import CreateTicketForm from "../tickets/CreateTicketForm";
import { useDeleteTicket } from "../tickets/useDeleteTicket";
import { useParams } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";

const WrapButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledFormHeader = styled(FormHeader)`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

function CreateProjcetTicketsForm({ control, name, disabled }) {
  const { projectId } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { minLength: 1 },
    keyName: "fieldId",
  });

  function handleConfirm(ticket) {
    const isDuplicate =
      ticket.employee_id !== "" &&
      fields.map(el => el.employee_id).includes(ticket.employee_id);

    if (isDuplicate) return;

    append(ticket);
  }

  return (
    <div>
      <StyledFormHeader>
        <span>ข้อมูลคณะเดินทาง</span>
        <Modal>
          <Modal.Open opens="ticket-form">
            <Button type="button">เพิ่มรายชื่อ</Button>
          </Modal.Open>
          <Modal.Window name="ticket-form">
            <CreateTicketForm onConfirm={handleConfirm} projectId={projectId} />
          </Modal.Window>
        </Modal>
      </StyledFormHeader>

      <Table columns="0.5fr 1fr .5fr .5fr">
        <Table.Header>
          <div>รหัสพนักงาน</div>
          <div>รายชื่อผู้เดินทาง</div>
          <div>สถานะ</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={fields}
          render={(ticket, index) => (
            <TicketRow
              key={ticket.fieldId}
              ticket={ticket}
              remove={remove}
              index={index}
              disabled={disabled}
            />
          )}
        />
      </Table>
    </div>
  );
}

export default CreateProjcetTicketsForm;

function TicketRow({ ticket, index, remove, disabled }) {
  const { deleteTicket } = useDeleteTicket();

  const { id, title, name, status, position, department, employee_id } = ticket;

  return (
    <Table.Row>
      <p>{employee_id ? employee_id : <span>&mdash;</span>}</p>
      <Stacked>
        <span>{`${title}${name}`}</span>
        {(position || department) && <span>{`${position} ${department}`}</span>}
      </Stacked>
      <TicketTagStatus status={status} />
      <WrapButton>
        <Modal>
          <Modal.Open opens={`delete-ticket-${index}`}>
            <Button type="button" size="small" variation="danger">
              ลบ
            </Button>
          </Modal.Open>
          <Modal.Window name={`delete-ticket-${index}`}>
            <ConfirmDelete
              resourceName={`หมายเลขเดินทาง`}
              disabled={disabled}
              onConfirm={() => {
                remove(index);
                if (id) deleteTicket(id);
              }}
            />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens={`edit-ticket-${index}`}>
            <Button type="button" size="small" variation="secondary">
              แก้ไข
            </Button>
          </Modal.Open>
          <Modal.Window name={`edit-ticket-${index}`}>
            <CreateTicketForm ticketToEdit={ticket} />
          </Modal.Window>
        </Modal>
      </WrapButton>
    </Table.Row>
  );
}
