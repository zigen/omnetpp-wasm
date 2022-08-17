<script>
    import ItemRow from "./ItemRow.svelte";
    import { readDir } from "../utils";
    let currentPath = "/";
    const pathHistory = [];
    const handleDirClicked = (dir) => () => {
        pathHistory.push(currentPath);
        currentPath = PATH.join(currentPath, dir);
        console.log(pathHistory, currentPath);
    };
    const handleFileClicked = (absFilePath) => () => {
    };
    $: directories = readDir(currentPath);
    const back = () => {
        if (pathHistory.length === 0) return;
        currentPath = pathHistory.pop();
    };
</script>

<h1>{currentPath}</h1>
<button on:click={back}>back</button>
<ul>
    {#each directories as item}
        <ItemRow
            on:move={handleDirClicked(item)}
            on:open={handleFileClicked(item)}
            abspath={PATH.join(currentPath, item)}
            pathname={item}
        />
    {/each}
</ul>
