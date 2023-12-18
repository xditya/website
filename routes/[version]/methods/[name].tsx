import { PageProps } from "$fresh/server.ts";
import { JsDocTagDoc, JsDocTagReturn } from "deno_doc/types.d.ts";
import { NotFound } from "../../../components/NotFound.tsx";
import { Method as Method_ } from "../../../components/Method.tsx";
import { Description } from "../../../components/Description.tsx";
import { MutedText } from "../../../components/MutedText.tsx";
import { Code } from "../../../components/Code.tsx";
import { TsType, TypeParams_ } from "../../../components/TsType.tsx";
import { getDocs } from "../../../docs.ts";

export default async function Method(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { methods, methodTypes, getLink } = await getDocs(version);
  const method = methods.find((v) => v.name == name);

  if (method === undefined) {
    return <NotFound />;
  }

  const example = method.jsDoc?.tags?.find((v) =>
    v.kind == "example"
  ) as JsDocTagDoc;

  const ret = method.functionDef.returnType
    ? (method.functionDef.returnType.repr == "Promise" &&
        method.functionDef.returnType.kind == "typeRef")
      ? method.functionDef.returnType.typeRef.typeParams
        ? method.functionDef.returnType.typeRef.typeParams[0]
        : undefined
      : method.functionDef.returnType
    : undefined;

  const retDesc = method.jsDoc?.tags?.find((v): v is JsDocTagReturn =>
    v.kind == "return"
  );

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <div class="mb-1">
          {method.jsDoc?.doc
            ? <Description>{method.jsDoc.doc}</Description>
            : null}
        </div>
      </div>
      {method.functionDef.typeParams.length > 0 && (
        <div>
          <MutedText small>TYPE PARAMETERS</MutedText>
          <div class="font-mono">
            <TypeParams_ getLink={getLink}>
              {method.functionDef.typeParams}
            </TypeParams_>
          </div>
        </div>
      )}
      {method.functionDef.params.length > 0 && (
        <div>
          <MutedText small>PARAMETERS</MutedText>
          <Method_ getLink={getLink} methodTypes={methodTypes}>
            {method}
          </Method_>
        </div>
      )}
      <div>
        <MutedText small>RESULT</MutedText>
        <div class="font-mono">
          {ret ? <TsType getLink={getLink}>{ret}</TsType> : "void"}
        </div>
        {retDesc?.doc && (
          <div class="pl-3">
            <Description>{retDesc.doc}</Description>
          </div>
        )}
      </div>
      {example?.doc && (
        <div class="flex flex-col gap-1.5 [&_pre]:(py-2 px-3 bg-db rounded-md text-base overflow-x-auto)">
          <MutedText small>EXAMPLES</MutedText>
          <Code>{example.doc}</Code>
        </div>
      )}
    </div>
  );
}
