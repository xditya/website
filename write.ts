import $ from "https://deno.land/x/dax@0.36.0/mod.ts";
import versions from "./versions.ts";
import { getDocs } from "./docs.ts";

Deno.env.set("WRITE", "1");

const lastTag = await fetch("https://api.github.com/repos/MTKruto/MTKruto/tags")
  .then((v) => v.json()).then((v) => v[0].name);

if (!versions.includes(lastTag)) {
  const newVersions = [lastTag, ...versions];
  while (versions.pop()) {
    //
  }
  for (const version of newVersions) {
    versions.push(version);
  }
  await getDocs();
  Deno.writeTextFileSync(
    "versions.ts",
    `export default ${JSON.stringify(versions, null, 2)};\n`,
  );
  await $`deno fmt`;
  await $`git add doc/*`;
  await $`git add versions.ts`;
  await $`git commit -m ${lastTag}`;
  await $`git push`;
}
