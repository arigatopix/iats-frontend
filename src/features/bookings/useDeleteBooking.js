import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingService } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleteBooking } = useMutation({
    mutationFn: deleteBookingService,
    onSuccess: () => {
      toast.success("Delete Successful");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteBooking, isDeleteBooking };
}
