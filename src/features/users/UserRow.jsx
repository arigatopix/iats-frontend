import styled from "styled-components";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { formatDateTH } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteUser } from "./useDeleteUser";
import { useChangeAccount } from "../admin/useChangeAccount";

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

const WrapButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function UserRow({ user }) {
  const { deleteUser, isDeleting } = useDeleteUser();
  const { changeAccount, isChanging } = useChangeAccount();

  const isProcessing = isChanging || isDeleting;

  const roleToTagName = {
    user: "silver",
    manager: "brand",
    admin: "green",
  };

  if (user) {
    const { id: userId, name, employee_id, role, email, updated_at } = user;

    return (
      <Table.Row>
        <div>{employee_id}</div>
        <Stacked>
          <span>{name}</span>
          <span>{email}</span>
        </Stacked>
        <div>
          <Tag type={roleToTagName[role]}>{role}</Tag>
        </div>
        <div>
          {updated_at ? formatDateTH(updated_at) : <span>&mdash;</span>}
        </div>

        <WrapButton>
          <Modal>
            <Modal.Open opens={`edit-user-${userId}`}>
              <Button size="small" variation="secondary">
                แก้ไข
              </Button>
            </Modal.Open>
            <Modal.Window name={`edit-user-${userId}`}>
              <CreateUserForm userToEdit={user} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens={`delete-user-${userId}`}>
              <Button size="small" variation="danger">
                ลบ
              </Button>
            </Modal.Open>
            <Modal.Window name={`delete-user-${userId}`}>
              <ConfirmDelete
                resourceName="user"
                disabled={isProcessing}
                onConfirm={() => deleteUser(employee_id)}
              />
            </Modal.Window>
          </Modal>

          <Button
            type="button"
            size="small"
            disabled={isProcessing}
            onClick={() => {
              changeAccount({ employee_id });
            }}
          >
            ล็อกอิน
          </Button>
        </WrapButton>
      </Table.Row>
    );
  }
}

export default UserRow;
