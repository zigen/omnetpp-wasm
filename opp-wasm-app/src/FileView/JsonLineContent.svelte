<script>
    import { readTextFile } from "../utils";
    import JSONFormatter from "json-formatter-js";

    export let abspath;
    let jsonList = readTextFile(abspath).split("\n");
    let panelContentJson = null;
    let selectedLine = -1;
    let jsonViewer;
    const openJsonPanel = (index) => () => {
        console.log(index, jsonList[index]);
        panelContentJson = jsonList[index];
        selectedLine = index;
    };
    $: if (jsonViewer != null && panelContentJson != null) {
        const formattter = new JSONFormatter(JSON.parse(panelContentJson));
        while (jsonViewer.firstChild ) {
            jsonViewer.removeChild(jsonViewer.firstChild);

        } 
        jsonViewer.appendChild(formattter.render());
    }
</script>

{#each jsonList as json, index}
    <div on:click={openJsonPanel(index)} class:selected={index == selectedLine}>{json}</div>
{/each}

{#if panelContentJson}
    <div class="json-view" bind:this={jsonViewer}>
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
    .selected {
        color: white;
        background-color: black;
    }
    .file-viewer .close-button {
        content: "x";
        cursor: pointer;
    }
</style>
