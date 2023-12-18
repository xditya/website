export function PropertyName(
  { children: { name, optional }, hasType }: {
    children: { name: string; optional: boolean };
    hasType: boolean;
  },
) {
  return (
    <>
      <span class="font-bold">
        {name}
      </span>
      <span class="opacity-50">
        {optional && (
          <span title="Optional" class="cursor-help">
            ?
          </span>
        )}
        {hasType && ":"}
      </span>
    </>
  );
}
