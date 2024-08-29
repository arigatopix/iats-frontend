import { useMutation } from "@tanstack/react-query";
import { fileUpload as fileUploadService } from "../services/apiUpload";
import toast from "react-hot-toast";

export function useUpload() {
  const { mutate: fileUpload, isLoading: isUploading } = useMutation({
    mutationFn: ({ fileName, file, folder }) =>
      fileUploadService(fileName, file, folder),
    onSuccess: () => {
      toast.success("อัพโหลดไฟล์สำเร็จ");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { fileUpload, isUploading };
}
