// name = "\"Example_run\""; url = URL.createObjectURL(new Blob([FS.readFile(name,{encoding: "utf8"})], {type: "application/text"})); name.replace("/", "_"); a = document.createElement("a"); a.href = url; a.setAttribute("download", name); a.textContent = name; document.body.appendChild(a); a.style.position = "fixed"; a.style.bottom = 0;a.style.backgroundColor = "white"
const main = () => {
	const panel = createFileExplorerPanel();
	const fileList = createFileViewer();
	panel.content.appendChild(fileList);
	const viewer = createFileViewerPanel();
	document.body.appendChild(viewer);
	fileList.onSelect = viewer.open;
};

const createFileViewerPanel = () => {
	let isOpen = false;
	const panel = document.createElement("DIV");
	panel.className = "panel";
	panel.style.position = "fixed";
	panel.style.backgroundColor = "white";
	panel.style.top = "10vh";
	panel.style.left = "30vw";
	panel.style.padding = "0.2rem 0.5rem";
	panel.style.border = "1px solid black";
	panel.style.maxHeight = "80vh";
	panel.style.maxWidth = "60vw";
	panel.style.overflow = "scroll";
	const panelTitle = document.createElement("DIV");
	panelTitle.style.cursor = "pointer";
	const content = document.createElement("DIV");
	content.className = "content";
	content.style.whiteSpace = "pre";
	content.style.fontFamily = "monospace";
	panel.content = content;

	const updatePanel = () => {
		panel.style.display = isOpen ? "block" : "none";
	}
	panelTitle.onclick = () => {
		isOpen = !isOpen;
		updatePanel();
	}

	panel.appendChild(panelTitle);
	panel.appendChild(content);
	document.body.appendChild(panel);
	updatePanel();
	panel.open = (path) => {
		isOpen = true;
		const contentStr = FS.readFile(path, {encoding: "utf8"});
		panelTitle.textContent =  "x   " + path;

		content.textContent = contentStr;
		updatePanel();
	}
	return panel;
}

const createFileViewer = () => {
	let currentPath = "/"
	let dirs = [];
	const listElem = document.createElement("UL");
	const twodot = document.createElement("LI");
	twodot.textContent = "..";
	twodot.onclick = () => updateCurrentPath(PATH.join(currentPath, ".."));

	const updateCurrentPath = (newPath) => {
			twodot.style.display = newPath === "/" ? "none" : "block";

		const newDirs = readDir(newPath);
		const elemsToBeRemoved = dirs.filter(e => !newDirs.includes(e));
		elemsToBeRemoved.forEach((name) => {
			const elem  = listElem.querySelector("#" + createId(currentPath ,name));
			listElem.removeChild(elem);
		});
		currentPath = newPath;
		newDirs.forEach((name) => {
			const absPath = PATH.join(currentPath,name);
			const id = createId( currentPath ,name);
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
				item.textContent =　(isDir ? "📁" : "") + absPath;
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

const createFileExplorerPanel = () => {
	let isOpen = false;
	const panel = document.createElement("DIV");
	panel.className = "panel";
	panel.style.position = "fixed";
	panel.style.backgroundColor = "white";
	panel.style.bottom = 0;
	panel.style.right = 0;
	panel.style.padding = "0.2rem 0.5rem";
	panel.style.border = "1px solid black";
	const panelTitle = document.createElement("DIV");
	panelTitle.style.cursor = "pointer";
	const content = document.createElement("DIV");
	content.className = "content";
	panel.content = content;

	const updatePanel = () => {
		panel.style.height = isOpen ? "auto" : "1.5rem";
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
const createId = (workingDir, name) =>  (workingDir + "-" +  name)
	.replaceAll("\/", "-")
	.replaceAll("\"", "_")
	.replaceAll("\.", "dot")
	.replaceAll("#", "sharp");
EXCLEDED_DIR =  [".", "..", "home", "tmp", "dev", "proc", "images"];
const readDir = (path) => FS.readdir(path).filter(e => !EXCLEDED_DIR.includes(e));
main();
