import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket as createTicketService } from "../../services/apiTickets";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  const { mutate: createTicket, isLoading: isCreatingTicket } = useMutation({
    mutationFn: ({ projectId, ticket }) =>
      createTicketService({ projectId, ticket }),
    onSettled: data => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", data.id.toString()],
      });
    },
  });

  return { createTicket, isCreatingTicket };
}
