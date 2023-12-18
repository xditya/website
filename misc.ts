export const commonPrefixes = [
  "account.",
  "auth.",
  "bots.",
  "channels.",
  "chatlists.",
  "contacts.",
  "help.",
  "langpack.",
  "messages.",
  "payments.",
  "phone.",
  "photos.",
  "stats.",
  "stickers.",
  "stories.",
  "updates.",
  "upload.",
  "users.",
  "folders.",
  "premium.",
];

export function fixName(name: string) {
  for (const p of commonPrefixes) {
    name = name.replace(
      new RegExp("^" + p.slice(0, -1) + "_"),
      p.slice(0, -1) + ".",
    );
  }
  name = name.replace(/_$/, "");
  return name;
}

export function mapName(name: string) {
  for (const p of commonPrefixes) {
    name = name.replace(
      new RegExp("^" + p),
      p.slice(0, -1) + "_",
    );
  }
  return name + "_";
}
