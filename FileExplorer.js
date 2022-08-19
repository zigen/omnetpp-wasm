
const styles = [];
const main = () => {
  const panel = createFileExplorerPanel();
  const fileList = createFileExplorer();
  panel.content.appendChild(fileList);
  const viewer = createFileViewerPanel();
  document.body.appendChild(viewer);
  fileList.onSelect = viewer.open;
  applyCSS();
};

styles.push(`
.panel {
	position: fixed;
	background-color: white;
	overflow: scroll;
	padding: 0.2rem 0.5rem;
	border: 1px solid black;
	max-height: 80vh;
	max-width: 60v;
}
.panel-header {
	display: flex;
	justify-content: space-between;
	position: fixed;
}
.file-viewer .panel-header {
	width: 60vw;
}
.file-viewer {
	top: 10vh;
	left: 20vw;
	width: 60vw;
	overflow: scroll;
}
.file-viewer .close-button {
	content: "x";
	cursor: pointer;
}
.file-viewer .content {
	white-space: pre;
	font-family: monospace;
	margin-top: 2rem;
}
`);

const createElement = (tagName, className, textContent) => {
  const e = document.createElement(tagName);
  if (className) e.className = className;
  if (textContent) e.textContent = textContent;
  return e;
}
const createFileViewerPanel = () => {
  let isOpen = false;
  let currentFilePath = null;
  const panel = createElement("DIV", "panel file-viewer");

  const panelHeader = createElement("DIV", "panel-header");
  const closeButton = createElement("BUTTON", "close-button", "x");
  const panelTitle = createElement("DIV");
  const actions = createElement("DIV", "actions-container");
  const actionButton = createElement("BUTTON", "action-button");
  const downloadLink = createElement("A", "download-link", "download");
  downloadLink.onmouseenter = () => {
    console.log("hover", currentFilePath);
    downloadLink.href = URL.createObjectURL(new Blob([FS.readFile(currentFilePath, { encoding: "utf8" })], { type: "application/text" }));
    downloadLink.setAttribute("download", PATH.basename(currentFilePath));
  }
  actions.appendChild(actionButton);
  actions.appendChild(downloadLink);
  const content = createElement("DIV", "content");
  panel.content = content;

  const updatePanel = () => {
    panel.style.display = isOpen ? "block" : "none";
  }
  closeButton.onclick = () => {
    isOpen = !isOpen;
    updatePanel();
  }
  panelHeader.appendChild(closeButton);
  panelHeader.appendChild(panelTitle);
  panelHeader.appendChild(actions);

  panel.appendChild(panelHeader);
  panel.appendChild(content);
  document.body.appendChild(panel);
  updatePanel();
  panel.open = (path) => {
    isOpen = true;
    const contentStr = FS.readFile(path, { encoding: "utf8" });
    panelTitle.textContent = path;
    currentFilePath = path;

    content.textContent = contentStr;
    updatePanel();
  }
  return panel;
}

const createFileExplorer = () => {
  let currentPath = "/"
  let dirs = [];
  const listElem = document.createElement("UL");
  const twodot = createElement("LI", "", "..");
  twodot.onclick = () => updateCurrentPath(PATH.join(currentPath, ".."));

  const updateCurrentPath = (newPath) => {
    twodot.style.display = newPath === "/" ? "none" : "list-item";

    const newDirs = readDir(newPath);
    const elemsToBeRemoved = dirs.filter(e => !newDirs.includes(e));
    elemsToBeRemoved.forEach((name) => {
      const elem = listElem.querySelector("#" + createId(currentPath, name));
      listElem.removeChild(elem);
    });
    currentPath = newPath;
    newDirs.forEach((name) => {
      const absPath = PATH.join(currentPath, name);
      const id = createId(currentPath, name);
      const isDir = FS.isDir(FS.lstat(absPath).mode);
      let item = listElem.querySelector("#" + id);
      if (!item) {
        item = document.createElement("LI");
        item.onclick = () => {
          if (isDir) {
            console.log(currentPath + name);
            updateCurrentPath(absPath);
            return;
          }
          if (typeof listElem.onSelect === "function") {
            listElem.onSelect(absPath);
          }
        };
        item.textContent = (isDir ? "📁" : "") + absPath;
        item.id = id;
        listElem.append(item);
      }
    });
    dirs = newDirs;
  }
  listElem.appendChild(twodot);
  updateCurrentPath("/");
  setInterval(() => updateCurrentPath(currentPath), 200);
  return listElem;
}

styles.push(`
.file-explorer {
	bottom: 0;
	right: 0;
}
`);
const createFileExplorerPanel = () => {
  let isOpen = false;
  const panel = createElement("DIV", "panel file-explorer");
  const panelTitle = document.createElement("DIV");
  panelTitle.style.cursor = "pointer";
  const content = createElement("DIV", "content");
  panel.content = content;

  const updatePanel = () => {
    panel.style.height = isOpen ? "auto" : "1.5rem";
    panel.style.overflow = isOpen ? "scroll" : "auto";
    panelTitle.textContent = isOpen ? "x" : "File Explorer";
    content.style.display = isOpen ? "block" : "none";
  }
  panelTitle.onclick = () => {
    isOpen = !isOpen;
    updatePanel();
  }

  panel.appendChild(panelTitle);
  panel.appendChild(content);
  document.body.appendChild(panel);
  updatePanel();
  return panel;
}

const applyCSS = () => {
  const elem = document.createElement("STYLE");
  elem.textContent = styles.join("\n");
  document.body.appendChild(elem);
};
main();
