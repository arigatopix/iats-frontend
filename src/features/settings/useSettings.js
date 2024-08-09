import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings, isLoading, error };
}
