import versions from "../versions.ts";

export default async function Home() {
  return (
    <>
      <div class="flex flex-col">
        {versions.map((v) => <a href={`/${v}`} class="link">{v}</a>)}
      </div>
    </>
  );
}
