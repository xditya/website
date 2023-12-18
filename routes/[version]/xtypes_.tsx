import { PageProps } from "$fresh/server.ts";
import { getDocs } from "../../docs.ts";

export default async function Types(
  _request: Request,
  { params: { version: v } }: PageProps,
) {
  const { version, types } = await getDocs(v);
  return (
    <div class="flex flex-col">
      {types.map((v) => (
        <a href={`/${version}/types/${v.name}`} class="link">{v.name}</a>
      ))}
    </div>
  );
}
