<script>
    import { readTextFile } from "../utils";
    export let abspath;
    let jsonList = readTextFile(abspath).split("\n");
    let panelContentJson = null;
    const openJsonPanel = (index) => () => {
        console.log(index, jsonList[index]);
        panelContentJson = jsonList[index];
    };
</script>

{#each jsonList as json, index}
    <div on:click={openJsonPanel(index)}>{json}</div>
{/each}

{#if panelContentJson}
    <div class="json-view">
        {panelContentJson}
    </div>
{/if}

<style>
    .json-view {
        top: 14vh;
        left: 30vw;
        width: 60vw;
        overflow: scroll;
        white-space: pre;
        font-family: monospace;
        margin-top: 2rem;
    }
    .file-viewer .close-button {
        content: "x";
        cursor: pointer;
    }
</style>
