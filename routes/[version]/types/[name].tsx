import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../components/NotFound.tsx";
import { Properties } from "../../../components/Properties.tsx";
import { TypeAlias } from "../../../components/TypeAlias.tsx";
import { Description } from "../../../components/Description.tsx";
import { getDocs } from "../../../docs.ts";
import { MutedText } from "../../../components/MutedText.tsx";

export default async function Type(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { types, getLink } = await getDocs(version);
  const type = types.find((v) => v.name == name);
  if (type === undefined) {
    return <NotFound />;
  }

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <div class="mb-1">
          {type.jsDoc?.doc ? <Description>{type.jsDoc.doc}</Description> : null}
        </div>
      </div>
      {type.kind == "interface"
        ? (
          <div>
            <MutedText small>PROPERTIES</MutedText>
            <Properties getLink={getLink}>
              {type.interfaceDef.properties}
            </Properties>
          </div>
        )
        : <TypeAlias getLink={getLink}>{type.typeAliasDef}</TypeAlias>}
    </div>
  );
}
