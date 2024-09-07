import { useMutation } from "@tanstack/react-query";
import { readFile as readFileService } from "../../services/apiFiles";

export function useReadFile() {
  const { mutate: readFile, isLoading: isReadingFile } = useMutation({
    mutationFn: ({ path }) => readFileService(path),
  });

  return { readFile, isReadingFile };
}
