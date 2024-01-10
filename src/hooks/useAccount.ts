import { accountControllerGetAccount } from "@/lib/api/generated";
import { QueryKeys } from "@/providers/query.provider";
import { useQuery } from "@tanstack/react-query";

export const useAccount = () => {
  return useQuery({
    queryKey: [QueryKeys.account],
    queryFn: accountControllerGetAccount,
  });
};
