import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../components/NotFound.tsx";
import { Properties } from "../../../components/Properties.tsx";
import { TypeAlias } from "../../../components/TypeAlias.tsx";
import { Description } from "../../../components/Description.tsx";
import { getDocs } from "../../../docs.ts";

export default async function Type(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { types, updateTypes, getLink } = await getDocs(version);
  const type = types.find((v) => v.name == name) ??
    updateTypes.find((v) => v.name == name);

  if (type === undefined) {
    return <NotFound />;
  }

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <p class="mb-1">
          {type.jsDoc?.doc ? <Description>{type.jsDoc.doc}</Description> : null}
        </p>
      </div>
      {type.kind == "interface"
        ? (
          <Properties getLink={getLink}>
            {type.interfaceDef.properties}
          </Properties>
        )
        : <TypeAlias getLink={getLink}>{type.typeAliasDef}</TypeAlias>}
    </div>
  );
}
