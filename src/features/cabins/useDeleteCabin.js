import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinService } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinService,
    onSuccess: () => {
      toast.success("Delete Successful");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteCabin, isDeleting };
}
