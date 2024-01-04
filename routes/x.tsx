import { getDocs } from "../docs.ts";
import { fixName } from "../misc.ts";
import { ClassMethodDef, DocNode, JsDocTagDoc } from "deno_doc/types.d.ts";

function getV(v: DocNode | ClassMethodDef, a: string) {
  return [fixName(v.name), {
    link: `https://mtkruto.deno.dev/${a}/${fixName(v.name)}`,
    example: (v.jsDoc?.tags?.find((v) =>
      v.kind == "example"
    ) as JsDocTagDoc).doc,
  }] as const;
}

export default async function X() {
  const { types, methods, tlEnums, tlFunctions, tlTypes } = await getDocs();
  return Response.json(
    types
      .map((v) => getV(v, "types"))
      .concat(methods.map((v) => getV(v, "methods")))
      .concat(tlEnums.map((v) => getV(v, "tl/enums")))
      .concat(tlTypes.map((v) => getV(v, "tl/types")))
      .concat(tlFunctions.map((v) => getV(v, "tl/functions"))),
  );
}
