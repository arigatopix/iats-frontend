import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getProjects } from "../../services/apiProjects";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useProjects() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "date_start-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const searchByName = searchParams.get("name") && {
    field: "name",
    value: searchParams.get("name"),
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
      "projects",
      sortBy,
      page,
      searchByName,
      searchByCountry,
      searchByDateStart,
    ],
    queryFn: () =>
      getProjects({
        sortBy,
        page,
        searchByName,
        searchByCountry,
        searchByDateStart,
      }),
  });

  if (data) {
    const { total } = data;

    const pageCount = total / PAGE_SIZE;

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: [
          "projects",
          sortBy,
          page + 1,
          searchByName,
          searchByCountry,
          searchByDateStart,
        ],
        queryFn: () =>
          getProjects({
            sortBy,
            page: page + 1,
            searchByName,
            searchByCountry,
            searchByDateStart,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "projects",
          sortBy,
          page - 1,
          searchByName,
          searchByCountry,
          searchByDateStart,
        ],
        queryFn: () =>
          getProjects({
            sortBy,
            page: page - 1,
            searchByName,
            searchByCountry,
            searchByDateStart,
          }),
      });
    }
  }

  return { data, isLoading, error };
}
