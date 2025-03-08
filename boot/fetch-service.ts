import config from "@/config/config";
import { toast } from "sonner";

type MehtodType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type HeaderType = Record<string, string | any>;
export interface FetchServiceType {
  method?: MehtodType;
  body?: any;
  additionalHeaders?: HeaderType;
  additionalOptions?: HeaderType;
}

function makeHeaders(additionalHeaders: HeaderType = {}) {
  return {
    "Content-Type": "application/json",
    ...additionalHeaders,
  };
}

export async function fetchService(
  url: string,
  {
    method = "GET",
    body = null,
    additionalHeaders = {},
    additionalOptions = {},
  }: FetchServiceType = {},
  version = "api" // for when there is a version for the api /v1 or /v2
) {
  const headers = makeHeaders(additionalHeaders);
  const options: any = {
    method,
    headers,
    ...additionalOptions,
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${config.ServerAddress}/${version}/${url}`,
      options
    );

    const data = await response.json();

    if (data.error) {
      toast(data.error, {
        className: "bg-negative text-negative-foreground",
        position: "top-center",
      });
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}
