import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../components/NotFound.tsx";
import { Description } from "../../../components/Description.tsx";
import { getDocs } from "../../../docs.ts";
import { TsType } from "../../../components/TsType.tsx";

export default async function Update(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { updates, getLink } = await getDocs(version);
  const update = updates.interfaceDef.properties.find((v) => v.name == name);

  if (update === undefined) {
    return <NotFound />;
  }

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <p class="mb-1">
          {update.jsDoc?.doc
            ? <Description>{update.jsDoc.doc}</Description>
            : null}
        </p>
      </div>
      <div class="font-mono">
        {update.tsType
          ? <TsType getLink={getLink}>{update.tsType}</TsType>
          : "any"}
      </div>
    </div>
  );
}
