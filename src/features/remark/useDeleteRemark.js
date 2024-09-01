import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteRemark as deleteRemarkService } from "../../services/apiRemark";

export function useDeleteRemark() {
  const queryClient = useQueryClient();

  const { mutate: deleteRemark, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, type }) => deleteRemarkService({ id, type }),
    onSuccess: ({ id, type }) => {
      console.log(id, type);

      toast.success(`ลบ ${type} หมายเลข ${id} สำเร็จ`);

      if (type === "project_additional_remarks") {
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      } else if (type === "ticket_additional_remarks") {
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
        });
      }
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteRemark, isDeleting };
}
