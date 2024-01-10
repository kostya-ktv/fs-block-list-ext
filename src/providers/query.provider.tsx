"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export enum QueryKeys {
  session = "session",
  account = "account",
  blockList = "blockList",
}
export const QueryKeyGeneric = (key: keyof typeof QueryKeys, data?: string) => {
  return data ? QueryKeys[key] + "/" + data : QueryKeys[key];
};
const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryProvider;
