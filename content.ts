export const pages = [...Deno.readDirSync("content")].filter((v) => v.isFile)
  .filter((v) => v.name.endsWith(".md"))
  .map((v) => ({
    href: "/" + v.name.replace(".md", "").replace("_index", ""),
    file: v.name,
    title: Deno.readTextFileSync("content/" + v.name)
      .trim()
      .split("\n")[0]
      .replace("# ", "")
      .trim(),
  }));
