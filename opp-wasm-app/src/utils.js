export const createId = (workingDir, name) => (workingDir + "-" + name)
  .replaceAll("\/", "-")
  .replaceAll("\"", "_")
  .replaceAll("\.", "dot")
  .replaceAll("#", "sharp");
const EXCLEDED_DIR = [".", "..", "home", "tmp", "dev", "proc", "images"];
export const readDir = (path) => FS.readdir(path).filter(e => !EXCLEDED_DIR.includes(e));
export const isDir = (absPath) => FS.isDir(FS.lstat(absPath).mode)
export const readTextFile = (absPath) => FS.readFile(absPath, { encoding: "utf8" });
export const readPngFile = (absPath) => FS.readFile(absPath);
export const isImage = (absPath) => absPath.endsWith(".png") || absPath.endsWith(".svg")