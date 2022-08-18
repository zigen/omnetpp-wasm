<script>
    import ItemRow from "./ItemRow.svelte";
    import { readDir } from "../utils";
    let currentPath = "/";
    let pathHistory = [];

    let directories = readDir(currentPath);
    $: reload = () => {
        directories = readDir(currentPath);
    };
    $: setInterval(reload, 1000);
    $: handleDirClicked = (dir) => () => {
        pathHistory.push(currentPath);
        pathHistory = pathHistory;
        currentPath = PATH.join(currentPath, dir);
        directories = readDir(currentPath);
    };

    const back = () => {
        if (pathHistory.length === 0) return;
        currentPath = pathHistory.pop();
        pathHistory = pathHistory;
        directories = readDir(currentPath);
    };

    const parent = () => {
        pathHistory.push(currentPath);
        pathHistory = pathHistory;
        currentPath = PATH.join(currentPath, "..");
        directories = readDir(currentPath);
    };
</script>

<h1>{currentPath}</h1>
<button on:click={back} disabled={pathHistory.length === 0}>back</button>
<button on:click={parent} disabled={currentPath === "/"}>parent</button>
<ul>
    {#each directories as item}
        <ItemRow
            on:move={handleDirClicked(item)}
            abspath={PATH.join(currentPath, item)}
            pathname={item}
        />
    {/each}
</ul>
