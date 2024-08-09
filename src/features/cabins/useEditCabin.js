import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createOrEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
