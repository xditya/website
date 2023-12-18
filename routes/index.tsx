import { Content } from "../components/Content.tsx";

export default async function Home() {
  return await Content({ id: "_index" });
}
