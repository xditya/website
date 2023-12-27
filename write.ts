import $ from "https://deno.land/x/dax@0.36.0/mod.ts";
import versions from "./versions.ts";
import { getDocs } from "./docs.ts";

Deno.env.set("WRITE", "1");

const lastTag = await fetch("https://api.github.com/repos/MTKruto/MTKruto/tags")
  .then((v) => v.json()).then((v) => v[0].name);

let last = false;
if (!versions.includes(lastTag)) {
  const newVersions = [lastTag, ...versions];
  while (versions.pop()) {
    //
  }
  for (const version of newVersions) {
    versions.push(version);
  }
  last = true;
}

if (last) {
  await getDocs();
}
await getDocs("gh");
Deno.writeTextFileSync(
  "versions.ts",
  `export default ${JSON.stringify(versions, null, 2)};\n`,
);
await $`deno fmt`;
await $`git add doc/*`;
if (last) {
  await $`git add versions.ts`;
}
await $`git -c "user.name=github-actions[bot]" -c "user.email=41898282+github-actions[bot]@users.noreply.github.com" -c "commit.gpgsign=false" commit -m "Update generated documentation(s)"`;
