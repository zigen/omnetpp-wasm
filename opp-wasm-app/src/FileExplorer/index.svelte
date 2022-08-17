<script>
    import ItemRow from "./ItemRow.svelte";
    import { readDir } from "../utils";
    let currentPath = "/";
    const pathHistory = [];
    const handleDirClicked = (dir) => () => {
        pathHistory.push(currentPath);
        currentPath = PATH.join(currentPath, dir);
    };
    $: directories = readDir(currentPath);
    const back = () => {
        if (pathHistory.length === 0) return;
        currentPath = pathHistory.pop();
    };
    const parent = () => {
        pathHistory.push(currentPath);
        currentPath = PATH.join(currentPath, "..");
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
