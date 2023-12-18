import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../../components/NotFound.tsx";
import { Description } from "../../../../components/Description.tsx";
import { TypeAlias } from "../../../../components/TypeAlias.tsx";
import { getDocs } from "../../../../docs.ts";

export default async function Enum(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { tlEnums, getTlLink } = await getDocs(version);
  const enum_ = tlEnums.find((v) => v.name == name);

  if (enum_ === undefined) {
    return <NotFound />;
  }

  return (
    <>
      <div class="h1">{name}</div>
      <p class="mb-4">
        {enum_.jsDoc?.doc ? <Description>{enum_.jsDoc.doc}</Description> : null}
      </p>
      <TypeAlias getLink={getTlLink}>{enum_.typeAliasDef}</TypeAlias>
    </>
  );
}
