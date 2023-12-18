import { PageProps } from "$fresh/server.ts";
import { Content } from "../components/Content.tsx";
import versions from "../versions.ts";

export default async function Rest(
  req: Request,
  { params: { rest } }: PageProps,
) {
  if (
    rest.startsWith("types/") || rest.startsWith("methods/") ||
    rest.startsWith("tl/")
  ) {
    const url = new URL(req.url);
    return Response.redirect(
      new URL(`/${versions[0]}${url.pathname}`, req.url),
    );
  }

  return await Content({ id: rest });
}
