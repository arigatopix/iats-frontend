import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTicket as editTicketService } from "../../services/apiTickets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditTicket() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: searchedEmployee,
    mutate: editTicket,
    isLoading: isEditing,
  } = useMutation({
    mutationFn: ({ ticket, editId }) => editTicketService({ ticket, editId }),
    onSuccess: data => {
      toast.success("แก้ไขข้อมูลผู้เดินทางสำเร็จ");
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      queryClient.setQueryData(["ticket", data.id.toString()], data);

      navigate("/tickets");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { searchedEmployee, editTicket, isEditing };
}
