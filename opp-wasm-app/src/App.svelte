<script>
  import FileExplorer from "./FileExplorer/index.svelte";
</script>

<div class="file-explorer panel">
  <FileExplorer />
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
