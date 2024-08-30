import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket as createTicketService } from "../../services/apiTickets";
import toast from "react-hot-toast";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  const { mutate: createTicket, isLoading: isCreatingTicket } = useMutation({
    mutationFn: ({ projectId, ticket }) =>
      createTicketService({ projectId, ticket }),
    onSuccess: data => {
      toast.success("เพิ่มผู้เดินทาสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", data[0].id.toString()],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createTicket, isCreatingTicket };
}
