import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTickets } from "../../services/apiTickets";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useTickets() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const isUseDefault = !filterValue || filterValue === "all";

  const filterOption = {
    field: "status",
    value: filterValue,
  };

  const filter = isUseDefault ? null : filterOption;

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const searchByName = searchParams.get("name") && {
    field: "name",
    value: searchParams.get("name"),
  };

  const searchByProjectname = searchParams.get("project_name") && {
    field: "project_name",
    value: searchParams.get("project_name"),
  };

  const searchByCountry = searchParams.get("country") && {
    field: "country",
    value: searchParams.get("country"),
  };

  const searchByDateStart = searchParams.get("date_start") && {
    field: "date_start",
    value: searchParams.get("date_start"),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "tickets",
      filter,
      sortBy,
      searchByName,
      searchByProjectname,
      page,
      searchByCountry,
      searchByDateStart,
    ],
    queryFn: () =>
      getTickets({
        filter,
        sortBy,
        searchByName,
        searchByProjectname,
        page,
        searchByCountry,
        searchByDateStart,
      }),
  });

  if (!isLoading) {
    const { total } = data;

    const pageCount = total / PAGE_SIZE;

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: [
          "tickets",
          filter,
          sortBy,
          searchByName,
          searchByProjectname,
          page + 1,
          searchByCountry,
          searchByDateStart,
        ],
        queryFn: () =>
          getTickets({
            filter,
            sortBy,
            searchByName,
            searchByProjectname,
            page: page + 1,
            searchByCountry,
            searchByDateStart,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "tickets",
          filter,
          sortBy,
          searchByName,
          searchByProjectname,
          page - 1,
          searchByCountry,
          searchByDateStart,
        ],
        queryFn: () =>
          getTickets({
            filter,
            sortBy,
            searchByName,
            searchByProjectname,
            page: page - 1,
            searchByCountry,
            searchByDateStart,
          }),
      });
    }
  }

  return { data, isLoading, error };
}
