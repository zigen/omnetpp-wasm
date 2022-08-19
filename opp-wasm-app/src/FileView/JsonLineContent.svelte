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
        while (jsonViewer.firstChild) {
            jsonViewer.removeChild(jsonViewer.firstChild);
        }
        jsonViewer.appendChild(formattter.render());
    }
    const close = () => {
        panelContentJson = null;
        selectedLine = -1;
    };
</script>

{#each jsonList as json, index}
    <div on:click={openJsonPanel(index)} class:selected={index == selectedLine}>
        {json}
    </div>
{/each}

{#if panelContentJson}
    <div class="json-view panel">
        <div class="panel-header">
            <button on:click={close}>x</button>
        </div>
        <div bind:this={jsonViewer} class="json-viewer-wrapper" />
    </div>
{/if}

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
        padding-bottom: 0.75rem;
    }
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
    .json-viewer-wrapper {
        padding-top: 1rem;
    }
</style>
