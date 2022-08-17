<script>
  import FileExplorer from "./FileExplorer/index.svelte";
  import FileView from "./FileView.svelte";
  import { opendFiles } from "./opendFiles";
  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<div class="file-explorer panel" class:open={isOpen}>
  <button on:click={toggle}>{isOpen ? "close" : "open"}</button>
  {#if isOpen}
    <FileExplorer />
    {#each $opendFiles as file, index}
      <FileView abspath={file.path} {index} />
    {/each}
  {/if}
</div>

<style>
  .panel {
    position: fixed;
    background-color: white;
    overflow: scroll;
    padding: 0.2rem 0.5rem;
    border: 1px solid black;
    max-height: 80vh;
    max-width: 60vw;
    min-width: 30vw;
  }
  .file-explorer {
    bottom: 0;
    right: 0;
  }
</style>
