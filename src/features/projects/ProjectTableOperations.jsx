import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import Button from "../../ui/Button";
import Search from "../../ui/Search";
import { HiPlus } from "react-icons/hi2";

function ProjectTableOperations() {
  const sortOptions = [
    { value: "project_name-asc", label: "เรียงตามชื่อโครงการ (ก-ฮ)" },
    { value: "project_name-desc", label: "เรียงตามชื่อโครงการ (ฮ-ก)" },
    { value: "date_start-asc", label: "เรียงตามวันเดินทางไป (น้อยไปมาก)" },
    { value: "date_start-desc", label: "เรียงตามวันเดินทางไป (มากไปน้อย)" },
  ];

  return (
    <TableOperations>
      <Button>เพิ่มโครงการ</Button>
      {/* <SortBy options={sortOptions} /> */}
      <Search placeholder="ค้นหาชื่อโครงการ" searchField="projectName" />
    </TableOperations>
  );
}

export default ProjectTableOperations;
