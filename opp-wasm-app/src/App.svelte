<script>
  import FileExplorer from "./FileExplorer/index.svelte";
  import FileView from "./FileView.svelte";
  import { opendFiles } from "./opendFiles";
</script>

<div class="file-explorer panel">
  <FileExplorer />
  {#each $opendFiles as file, index}
    <FileView abspath={file.path} {index} />
  {/each}
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
