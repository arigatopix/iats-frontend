import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Search from "../../ui/Search";

function TicketTableOperations() {
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
  const sortOptions = [
    { value: "project_name-asc", label: "เรียงตามชื่อโครงการ (ก-ฮ)" },
    { value: "project_name-desc", label: "เรียงตามชื่อโครงการ (ฮ-ก)" },
    { value: "date_start-asc", label: "เรียงตามวันเดินทางไป (น้อยไปมาก)" },
    { value: "date_start-desc", label: "เรียงตามวันเดินทางไป (มากไปน้อย)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="status" options={filterOptions} />
      {/* <SortBy options={sortOptions} /> */}
      <Search placeholder="ค้นหาชื่อ" searchField="name" />
    </TableOperations>
  );
}

export default TicketTableOperations;
