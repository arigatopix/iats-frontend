import { useMutation } from "@tanstack/react-query";
import { fileUpload as fileUploadService } from "../../services/apiFiles";
import toast from "react-hot-toast";

export function useUpload() {
  const { mutate: fileUpload, isLoading: isUploading } = useMutation({
    mutationFn: ({ formData }) => fileUploadService(formData),
    onSuccess: () => {
      toast.success("อัพโหลดไฟล์สำเร็จ");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { fileUpload, isUploading };
}
