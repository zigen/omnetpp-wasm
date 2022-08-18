const EXCLEDED_DIR = [".", "..", "home", "tmp", "dev", "proc", "images"];

export const readDir = (path) => FS.readdir(path).filter(e => !EXCLEDED_DIR.includes(e));

export const isDir = (absPath) => FS.isDir(FS.lstat(absPath).mode)

export const readTextFile = (absPath) => FS.readFile(absPath, { encoding: "utf8" });

export const readPngFile = (absPath) => FS.readFile(absPath);

export const isImage = (absPath) => absPath.endsWith(".png") || absPath.endsWith(".svg")

export const createObjectURL = (absPath) => {
  const fileContent = FS.readFile(absPath, { encoding: "utf8" });
  const mimeType = "application/text";
  return URL.createObjectURL(
    new Blob([fileContent], { type: mimeType })
  );
}

export const getFileMimeType = (absPath) => {
  if (absPath.endsWith(".png")  ) return "image/png";
  if (absPath.endsWith(".gif")  ) return "image/gif";
  if (absPath.endsWith(".svg")  ) return "image/svg+xml";
  if (absPath.endsWith(".jpg") || absPath.endsWith(".jpeg")  ) return "image/jpeg";
  if (absPath.endsWith(".jsonl")) return "application/x-ndjson";
  return "text/plain";
}