import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">จัดการผู้ใช้งาน</Heading>
        <UserTableOperations />
      </Row>
      <Row>
        <UserTable />
      </Row>
    </>
  );
}

export default Users;
