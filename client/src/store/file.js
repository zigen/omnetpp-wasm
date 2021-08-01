import { writable } from "svelte/store";
import { fileSystem } from "./simulator";

export const selectedFilePath = writable(null);
export const selectedFileContent = writable("");
let fs;
fileSystem.subscribe(_fs => {
  if (_fs) fs = _fs;
});
selectedFilePath.subscribe((path) => {
  if (!path || !fs) return;
  selectedFileContent.set(fs.readFile(path, {encoding: "utf8"}))
});
