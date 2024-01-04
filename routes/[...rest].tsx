import { PageProps } from "$fresh/server.ts";
import { Content } from "../components/Content.tsx";

export default async function Rest(
  _req: Request,
  { params: { rest } }: PageProps,
) {
  return await Content({ id: rest });
}
