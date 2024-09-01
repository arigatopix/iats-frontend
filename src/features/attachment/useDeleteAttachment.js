import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteAttachment as deleteAttachmentService } from "../../services/apiAttatchments";

export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  const { mutate: deleteAttachment, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, type }) => deleteAttachmentService({ id, type }),
    onSuccess: ({ id, type }) => {
      toast.success(`ลบ ${type} หมายเลข ${id} สำเร็จ`);

      if (type === "project_attachments") {
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      } else if (type === "ticket_attachments") {
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
        });
      }
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteAttachment, isDeleting };
}
