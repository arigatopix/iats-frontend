import Tag from "../../ui/Tag";
import { parseStatus } from "../../utils/helpers";

function TicketTagStatus({ status }) {
  const statusToTagName = {
    unconfirmed: "silver",
    confirmed: "green",
  };
  return <Tag type={statusToTagName[status]}>{parseStatus(status)}</Tag>;
}

export default TicketTagStatus;
