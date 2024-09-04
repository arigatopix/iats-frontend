import Tag from "../../ui/Tag";

const parseStatus = status => {
  switch (status) {
    case "confirmed":
      return "ยืนยัน";
    default:
      return "รอยืนยัน";
  }
};

function TicketTagStatus({ status }) {
  const statusToTagName = {
    unconfirmed: "silver",
    confirmed: "green",
  };
  return <Tag type={statusToTagName[status]}>{parseStatus(status)}</Tag>;
}

export default TicketTagStatus;
