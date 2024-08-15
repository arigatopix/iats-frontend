import { useQuery } from "@tanstack/react-query";

import { getTickets } from "../../services/apiTickets";

export function useTickets() {
  const {
    data: tickets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return { tickets, isLoading, error };
}
