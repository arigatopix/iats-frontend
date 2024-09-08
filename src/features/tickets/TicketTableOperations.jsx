import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Search from "../../ui/Search";
import { useUser } from "../authentication/useUser";
import { roles } from "../../utils/roles";

function TicketTableOperations() {
  const {
    user: { role },
  } = useUser();

  const filterOptions = [
    {
      value: "all",
      label: "ทั้งหมด",
    },
    {
      value: "unconfirmed",
      label: "รอยืนยัน",
    },
    {
      value: "confirmed",
      label: "ยืนยัน",
    },
  ];

  return (
    <TableOperations>
      <Filter filterField="status" options={filterOptions} />
      {roles.includes(role) && (
        <Search placeholder="ค้นหาชื่อ" searchField="name" />
      )}
      <Search placeholder="ค้นหาชื่อโครงการ" searchField="project_name" />
    </TableOperations>
  );
}

export default TicketTableOperations;
