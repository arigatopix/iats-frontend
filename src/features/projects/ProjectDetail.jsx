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
