import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllUser as getAllUserService } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("role");

  const isUseDefault = !filterValue || filterValue === "all";

  const filterOption = {
    field: "role",
    value: filterValue,
  };

  const filter = isUseDefault ? null : filterOption;

  const sortByRaw = searchParams.get("sortBy") || "updated_at-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const searchByName = searchParams.get("name") && {
    field: "name",
    value: searchParams.get("name"),
  };

  const searchByEmployeeId = searchParams.get("employee_id") && {
    field: "employee_id",
    value: searchParams.get("employee_id"),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", filter, sortBy, searchByName, searchByEmployeeId, page],
    queryFn: () =>
      getAllUserService({
        filter,
        sortBy,
        searchByName,
        searchByEmployeeId,
        page,
      }),
  });

  if (data) {
    const { total } = data;

    const pageCount = total / PAGE_SIZE;

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: [
          "users",
          filter,
          sortBy,
          searchByName,
          searchByEmployeeId,
          page + 1,
        ],
        queryFn: () =>
          getAllUserService({
            filter,
            sortBy,
            searchByName,
            searchByEmployeeId,
            page: page + 1,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "users",
          filter,
          sortBy,
          searchByName,
          searchByEmployeeId,
          page - 1,
        ],
        queryFn: () =>
          getAllUserService({
            filter,
            sortBy,
            searchByName,
            searchByEmployeeId,
            page: page - 1,
          }),
      });
    }
  }

  return { data, isLoading, error };
}
