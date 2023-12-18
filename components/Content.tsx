import { Head } from "$fresh/runtime.ts";
import { Eta } from "eta";
import { marked } from "../marked.ts";
import { NotFound } from "../components/NotFound.tsx";
import versions from "../versions.ts";
import { pages } from "../content.ts";

const headings = [
  `[&_h1]:(mt-2.5 mb-1 font-bold text-4xl link:text-red-500)`,
  `[&_h2]:(mt-14 mb-4 font-bold text-2xl)`,
  "[&_h3]:(mt-7 mb-1 font-bold text-xl)",
  "[&_h4]:(mt-2.5 mb-1 font-bold text-base)",
  "[&_h5]:(mt-2.5 mb-1 font-bold text-sm)",
  "[&_h6]:(mt-2.5 mb-1 font-bold text-xs)",
];

const blocks = [
  "[&_p]:my-4",
  "[&_ul]:my-4",
  "[&_ol]:my-4",
  "[&_blockquote]:my-4",
  "[&_dl]:my-4",
  "[&_table]:my-4",
];

const code = [
  ["[&_pre]:(py-2 px-3 bg-db rounded-md text-base overflow-x-auto)"],
];

const lists = [
  "[&_ul]:pl-10",
  "[&_ol]:pl-10",
  "[&_ul]:list-disc",
  "[&_ol]:list-decimal",
];

const misc = [
  "[&_a]:(text-tg hover:underline)",
  "[&_b]:font-bold",
  "[&_input,_&_select]:(px-4 py-2 min-w-[200px] rounded-md appearance-none bg-db)",
  "[&_.code-group>div:first-child]:(flex text-xs rounded-t-md bg-[#aaa8] dark:bg-white/10 overflow-hidden [&_button]:(py-1 px-3 bg-db first:rounded-tl-md))",
  "[&_.code-group_div_pre]:rounded-t-none",
  "[&_:not(pre)_>_code]:(inline-block rounded-md text-sm px-2 py-0.5 bg-db)",
  "[&_blockquote]:(pl-[calc(16px+6px)] pr-[16px] py-0.5 bg-tg/25 rounded-md relative before:(absolute left-0 top-0 h-full w-[6px] bg-tg rounded-l-md overflow-hidden))",
];

const all = [headings, blocks, code, lists, misc]
  .flat();

const eta = new Eta({ autoEscape: false });

const classes = all.join(" ");

const codeGroup = (...entries: [string, string, string][]) => (
  `
<div class="code-group">

<div>
${
    entries.map((
      v,
      i,
    ) => (`<button ${
      i == 0 ? "" : 'style="background:transparent"'
    } onclick="[...this.parentElement.children].forEach(function (v, i) {v.style.background = i == ${i} ? '' : 'transparent'});[...this.parentElement.parentElement.children].slice(1).forEach(function (v, i) {v.style.display = i == ${i} ? 'block' : 'none'})">${
      v[0]
    }</button>`)).join(
      "",
    )
  }
</div>

${
    entries.map((v, i) =>
      `<div class="code-group-item" ${i == 0 ? "" : "hidden"}>

\`\`\`${v[1]}
${v[2]}
\`\`\`

</div>`
    ).join("\n")
  }

</div>
`
);

const installPackage = (pkg: string) =>
  codeGroup(
    [
      "pnpm",
      "bash",
      "pnpm add " + pkg,
    ],
    [
      "yarn",
      "bash",
      "yarn add " + pkg,
    ],
    [
      "npm",
      "bash",
      "npm install " + pkg,
    ],
  );

const nav = (left: string | null, right: string | null) => {
  return `
<div class="n">

${
    left
      ? `[&laquo; ${pages.find((v) => v.href == left)?.title}](${left})`
      : "<div></div>"
  }

${
    right
      ? `[${pages.find((v) => v.href == right)?.title} &raquo;](${right})`
      : "<div></div>"
  }

</div>
`;
};

export async function Content({ id }: { id: string }) {
  const latestVersion = versions[0];
  const deno = `https://deno.land/x/mtkruto@${latestVersion}`;
  const esm = `https://esm.sh/@mtkruto/browser@${latestVersion}`;
  try {
    let content = await Deno.readTextFile("content/" + id + ".md");
    const title = (() => {
      const fl = content.split("\n")[0].trim();
      if (fl.startsWith("# ")) {
        return fl.slice(2).trim();
      }
    })();
    content = await eta.renderStringAsync(content, {
      latestVersion,
      codeGroup,
      installPackage,
      nav,
      esm,
      deno,
    });
    content = await marked.parse(content, { async: true });

    return (
      <>
        {title && (
          <Head>
            <title>MTKruto | {title}</title>
          </Head>
        )}
        <div
          id="cx"
          class={classes}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </>
    );
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return <NotFound />;
    } else {
      throw err;
    }
  }
}
