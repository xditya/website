import { Head } from "$fresh/runtime.ts";
import { MutedText } from "./MutedText.tsx";

export function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <MutedText>Not Found</MutedText>
    </>
  );
}
