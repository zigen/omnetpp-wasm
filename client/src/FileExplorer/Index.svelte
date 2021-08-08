<script>
  import { fileSystem } from "../store/simulator";
  import Node from "./Node.svelte";
  let dirs = [];
  let fs = null;
  const EXCLUDES = [
    ".",
    "..",
    "tmp",
    "dev",
    "proc"
  ];
  fileSystem.subscribe((_fs) => {
    if (!_fs) return;
    dirs = _fs.readdir("/").filter((name) => EXCLUDES.indexOf(name) == -1);
    fs = _fs;
  });
</script>

<h2>explorer</h2>
<div class="wrapper">
<table class="table">
  <thead />
  <tbody>
    {#each dirs as dir}
      <Node {fs} path={"/" + dir} depth={0} />
    {/each}
  </tbody>
</table>
</div>
<style>
  .wrapper {
    height: 100%;
    overflow: scroll;
  }
</style>
