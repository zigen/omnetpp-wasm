<script>
  import { fileSystem } from "../store/simulator";
  import Node from "./Node.svelte";
  let dirs = [];
  let fs = null;
  fileSystem.subscribe((_fs) => {
    if (!_fs) return;
    dirs = _fs.readdir("/").filter((name) => name != "." && name != "..");
    fs = _fs;
  });
</script>

<div>
  <h2>explorer</h2>
  <table>
    <thead />
    <tbody>
      {#each dirs as dir}
        <Node fs={fs} path={"/" + dir} depth={0}/>
      {/each}
    </tbody>
  </table>
</div>
