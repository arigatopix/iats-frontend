import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSettings, isLoading: isEditing } = useMutation({
    mutationFn: newSettings => updateSetting(newSettings),
    onSuccess: () => {
      toast.success("New settings successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { editSettings, isEditing };
}
