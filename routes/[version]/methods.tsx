import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../components/NotFound.tsx";
import { getDocs } from "../../docs.ts";

export default async function Methods(
  _request: Request,
  { params: { version: v } }: PageProps,
) {
  const { version, methods } = await getDocs(v);
  if (methods.length == 0) {
    return <NotFound />;
  }

  return (
    <div class="flex flex-col">
      {methods.map((v) => (
        <a href={`/${version}/methods/${v.name}`} class="link">{v.name}</a>
      ))}
    </div>
  );
}
