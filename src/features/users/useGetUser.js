import { useMutation } from "@tanstack/react-query";
import { getUser as getUserService } from "../../services/apiUsers";

export function useGetUser() {
  const { mutate: getUser, isLoading } = useMutation({
    mutationFn: ({ employee_id }) => getUserService(employee_id),
  });

  return { getUser, isLoading };
}
