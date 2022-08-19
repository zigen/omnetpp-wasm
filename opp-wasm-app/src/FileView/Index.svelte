<script>
    import { onMount } from "svelte";
    import { readTextFile, createObjectURL, getFileMimeType } from "../utils";
    import { opendFiles } from "../opendFiles";
    import JsonLineContent from "./JsonLineContent.svelte";
    import TextContent from "./TextContent.svelte";
    import ImageContent from "./ImageContent.svelte";

    export let abspath;
    export let index;

    let downloadButton;

    const close = () => {
        opendFiles.update((files) => files.filter((f) => f.path !== abspath));
    };
    const mimeType = getFileMimeType(abspath);

    onMount(() => {
        downloadButton.href = createObjectURL(abspath);
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
        {#if mimeType.startsWith("image/")}
            <ImageContent {abspath} {mimeType} />
        {:else if mimeType == "application/x-ndjson"}
            <JsonLineContent {abspath} />
        {:else}
            <TextContent {abspath} />
        {/if}
    </div>
</div>

<style>
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
    .file-viewer .content {
        white-space: pre;
        font-family: monospace;
        margin-top: 2rem;
    }
</style>
