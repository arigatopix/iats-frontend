import { useNavigate, useParams } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";

function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const ticket = {
    id: 1,
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
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">หมายเลขเดินทาง #{ticketId} </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; กลับ</ButtonText>
      </Row>
      <CreateTicketForm ticketToEdit={ticket} />
    </>
  );
}

export default TicketDetail;
