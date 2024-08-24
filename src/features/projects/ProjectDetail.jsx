import { useNavigate, useParams } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import { fromToday, getToday } from "../../utils/helpers";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = {
    id: projectId,
    name: "asdf",
    description: "ไปไหน",
    country: "จีน",
    date_start: getToday(),
    date_end: fromToday(2),
    remark: "ทดสอบ",
    projectAttachments: [
      {
        url: "https://scdtixmmlszivlnxwevz.supabase.co/storage/v1/object/public/iats-bucket/project_files/IMG_9056.png",
        title: "iats_logo",
      },
    ],
    projectAdditionalRemarks: [{ id: 1, remark: "test" }],
    tickets: [
      {
        id: 1,
        employeeId: "503015",
        title: "นาย",
        name: "ธีรัช แก้วศรีทัศน์",
        title_eng: "Mr.",
        name_eng: "Teeruch Kaewsritas",
        position: "ชผ.",
        department: "กบล.",
        phone_number: "0966635951",
        email: "email@exmaple.com",
        contact_name: "นาย เอ กบิล",
        remark: "ทำนู้นนี่",
        additionalRemarkTicket: [
          {
            remark: "ขอประกันเพิ่ม",
          },
        ],
        status: "unconfirmed",
        files: [
          {
            title: "file1",
            url: "https://asdfd",
          },
        ],
      },

      {
        id: 2,
        title: "นาย",
        name: "ศุภชัย เอกอุ่น",
        title_eng: "Mr.",
        name_eng: "",
        position: "ผวก.",
        department: "",
        phone_number: "",
        email: "",
        contact_name: "นาย เอ กบิล",
        remark: "ทำนู้นนี่",
        additionalRemarkTicket: [
          {
            remark: "ขอประกันเพิ่ม",
          },
        ],
        status: "unconfirmed",
        files: [
          {
            title: "file2",
            url: "https://asdfd",
          },
        ],
      },
    ],
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">หมายเลขโครงการ #{projectId} </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; กลับ</ButtonText>
      </Row>

      <CreateProjectForm projectToEdit={project} />
    </>
  );
}

export default ProjectDetail;
