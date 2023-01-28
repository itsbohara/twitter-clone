import { SERVER } from "@/client/axios";

export function relativeCDNUrl(path: string) {
  try {
    const url = new URL(path);
    return path;
  } catch (error) {
    return `${SERVER}/${path}`;
  }
}
