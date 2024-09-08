import { useMutation } from "@tanstack/react-query";
import { deleteFile as deleteFileService } from "../../services/apiFiles";
import toast from "react-hot-toast";

export function useDeleteFile() {
  const { mutate: deleteFile, isLoading: isDeletingFile } = useMutation({
    mutationFn: ({ path }) => deleteFileService(path),
    onSuccess: () => {
      toast.success("ลบไฟล์สำเร็จ");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteFile, isDeletingFile };
}
