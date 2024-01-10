"use client";
import { NotAuth } from "@/components/not-auth";
import { Switch } from "@/components/ui/switch";
import { useAccount } from "@/hooks";
import { accountControllerPatchAccount } from "@/lib/api/generated";
import { QueryKeys } from "@/providers/query.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const account = useAccount();
  const queryClient = useQueryClient();

  const blockAccountMutation = useMutation({
    mutationFn: accountControllerPatchAccount,
    onSuccess: async (data) =>
      await queryClient.setQueryData([QueryKeys.account], data),
  });

  return (
    <div
      className="
    flex
    flex-col
    w-[300px]
    gap-y-3
    rounded-[20px]
    text-[14px]
    p-5
    "
    >
      <h2 className="font-semibold text-xl">Block-list Extension</h2>
      {account.isSuccess ? (
        <div className="flex flex-col w-full gap-y-3">
          <p className="text-green-500 text-center bg-green-50 w-full p-3 ">
            Successfully connected
          </p>
          <div className="flex gap-x-3">
            <label>Firewall</label>
            <Switch
              onCheckedChange={() =>
                blockAccountMutation.mutate({
                  isBlockingEnabled: !account.data.isBlockingEnabled,
                })
              }
              checked={account.data.isBlockingEnabled || false}
            />
          </div>
        </div>
      ) : (
        <NotAuth />
      )}
    </div>
  );
}

export default App;
