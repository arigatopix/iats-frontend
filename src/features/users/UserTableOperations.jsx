import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Search from "../../ui/Search";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateUserForm from "./CreateUserForm";

function UserTableOperations() {
  const filterOptions = [
    {
      value: "all",
      label: "ทั้งหมด",
    },
    {
      value: "manager",
      label: "Manager",
    },
    {
      value: "user",
      label: "User",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  return (
    <TableOperations>
      {/* <Modal>
        <Modal.Open opens={`add-user`}>
          <Button type="button">สร้างผู้ใช้งาน</Button>
        </Modal.Open>
        <Modal.Window name={`add-user`}>
          <CreateUserForm />
        </Modal.Window>
      </Modal> */}

      <Filter filterField="role" options={filterOptions} />

      <Search placeholder="ค้นหาชื่อ" searchField="name" />
      <Search placeholder="ค้นหาตามรหัสพนักงาน" searchField="employee_id" />
    </TableOperations>
  );
}

export default UserTableOperations;
