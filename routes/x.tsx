import { getDocs } from "../docs.ts";
import { fixName, mapName } from "../misc.ts";

export default async function X() {
  const { types, methods, tlEnums, tlFunctions, tlTypes } = await getDocs();
  return Response.json(
    types.map((v) => [v.name, `https://mtkruto.deno.dev/types/${v.name}`])
      .concat(methods.map(
        (v) => [v.name, `https://mtkruto.deno.dev/methods/${v.name}`],
      ))
      .concat(tlEnums.map(
        (v) => [
          fixName(v.name),
          `https://mtkruto.deno.dev/tl/eunms/${fixName(v.name)}`,
        ],
      ))
      .concat(tlTypes.map(
        (v) => [
          fixName(v.name),
          `https://mtkruto.deno.dev/tl/types/${fixName(v.name)}`,
        ],
      ))
      .concat(tlFunctions.map(
        (v) => [
          fixName(v.name),
          `https://mtkruto.deno.dev/tl/functions/${fixName(v.name)}`,
        ],
      )),
  );
}
