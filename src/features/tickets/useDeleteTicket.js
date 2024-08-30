import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTicket as deleteTicketService } from "../../services/apiTickets";
import { useParams } from "react-router-dom";

export function useDeleteTicket() {
  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const { mutate: deleteTicket, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTicketService,
    onSuccess: data => {
      toast.success("ลบข้อมูลเดินทางสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteTicket, isDeleting };
}
