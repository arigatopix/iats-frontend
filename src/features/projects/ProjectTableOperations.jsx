import TableOperations from "../../ui/TableOperations";
// import SortBy from "../../ui/SortBy";
import Button from "../../ui/Button";
import Search from "../../ui/Search";
import { useNavigate } from "react-router-dom";
import DateFilter from "../../ui/DateFilter";

function ProjectTableOperations() {
  const navigate = useNavigate();

  // var curr = new Date();
  // curr.setDate(curr.getDate() + 3);
  // var date = curr.toISOString().substring(0, 10);

  // const sortOptions = [
  //   { value: "project_name-asc", label: "เรียงตามชื่อโครงการ (ก-ฮ)" },
  //   { value: "project_name-desc", label: "เรียงตามชื่อโครงการ (ฮ-ก)" },
  //   { value: "date_start-asc", label: "เรียงตามวันเดินทางไป (น้อยไปมาก)" },
  //   { value: "date_start-desc", label: "เรียงตามวันเดินทางไป (มากไปน้อย)" },
  // ];

  return (
    <TableOperations>
      <Button type="button" onClick={() => navigate("create")}>
        เพิ่มโครงการ
      </Button>
      {/* <SortBy options={sortOptions} /> */}
      <Search placeholder="ค้นหาชื่อโครงการ" searchField="name" />
      <Search placeholder="ค้นหาตามประเทศ" searchField="country" />
      <DateFilter
        placeholder="ค้นหาจากวันเดินทาง"
        searchField="date_start"
        type="text"
      />
    </TableOperations>
  );
}

export default ProjectTableOperations;
