import { authControllerGetSession } from "@/lib/api/generated";
import { QueryKeys } from "@/providers/query.provider";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: [QueryKeys.session],
    queryFn: authControllerGetSession,
    retry: 0,
  });
};
