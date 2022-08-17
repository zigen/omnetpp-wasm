<script>
    import { onMount } from "svelte";
    import { readTextFile } from "./utils";
    import { opendFiles } from "./opendFiles";
    export let abspath;
    export let index;
    let textContent = readTextFile(abspath);
    let downloadButton;
    const close = () => {
        opendFiles.update((files) => files.filter((f) => f.path !== abspath));
    };

    onMount(() => {
        const fileContent = FS.readFile(abspath, { encoding: "utf8" });
        const mimeType = "application/text";
        downloadButton.href = URL.createObjectURL(
            new Blob([fileContent], { type: mimeType })
        );
        downloadButton.setAttribute("download", PATH.basename(abspath));
    });
</script>

<div class="panel file-viewer">
    <div class="panel-header">
        <button on:click={close}>x</button>
        <div>{abspath}</div>
        <a class="download-link" bind:this={downloadButton}>download</a>
    </div>
    <div class="content">
        {textContent}
    </div>
</div>

<style>
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
</style>
