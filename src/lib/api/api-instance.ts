// custom-instance.ts

import { CONSTANTS } from "@/lib/constants";

const baseURL = CONSTANTS.ADMIN_BE_URL;
class ApiError extends Error {
  constructor(public data: unknown) {
    super("Api error");
  }
}
export const createInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<any, any>;
  data?: BodyType<unknown>;
  headers?: HeadersInit;
  responseType?: string;
}): Promise<T> => {
  const response = await fetch(
    `${baseURL}${url}` + new URLSearchParams(params),
    {
      method,
      credentials: "include",
      headers,
      ...(data ? { body: JSON.stringify(data) } : {}),
    },
  );
  if (!response.status.toString().startsWith("2")) {
    throw new ApiError(response);
  }
  return response.json();
};

export default createInstance;

export type ErrorType<Error> = Error;
export type BodyType<BodyType> = BodyType;
