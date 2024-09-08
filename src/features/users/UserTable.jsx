import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import { useUsers } from "./useUsers";
import Empty from "../../ui/Empty";
import UserRow from "./UserRow";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
// import TicketRow from "./UserRow";
// import { searchBy } from "../../utils/helpers";
// import { roles } from "../../utils/roles";
// import { useUser } from "../authentication/useUser";

function UserTable() {
  const { data, isLoading, error } = useUsers();

  // const {
  //   user: { role },
  // } = useUser();

  // const [searchParams] = useSearchParams();

  if (isLoading || error) return <Spinner />;

  const { users, total } = data;

  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns={"1fr 2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div>รหัสพนักงาน</div>
          <div>ชื่อผู้ใช้งาน</div>
          <div>สิทธิ์</div>
          <div>ใช้งานล่าสุด</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={user => <UserRow key={user.id} user={user} />}
        />

        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
