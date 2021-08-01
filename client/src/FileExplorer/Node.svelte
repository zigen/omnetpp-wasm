<script>
  export let fs;
  export let path;
  export let depth;
  import {selectedFilePath, selectedFileContent} from "../store/file";
  let openDir = false;
  let dirs = [];
  const mode = fs.lstat(path).mode;
  const isDir = fs.isDir(mode);
  const onClick = () => {
    if (isDir) {
    openDir = !openDir;
    if (openDir) {
      dirs = fs.readdir(path).filter((name) => name != "." && name != "..");
    }
    } else {
      selectedFilePath.set(path);
    };
  };
</script>

<tr on:click={onClick}>
  <td>{isDir ? "dir" : "file"}</td>
  <td style={`padding-left: ${depth}rem`}>{path.slice(path.lastIndexOf("/")+1)}</td>
</tr>
{#if openDir}
  {#each dirs as dir}
    <svelte:self {fs} path={path + "/" + dir} depth={depth+1}/>
  {/each}
{/if}
