import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getTicket } from "../../services/apiTickets";

export function useTicket() {
  const { ticketId } = useParams();
  const {
    data: ticket,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicket(ticketId),
    retry: false,
  });

  return { ticket, isLoading, error };
}
