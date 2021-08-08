<script>
  // import FileExplorer from "./FileExplorer/Index.svelte";
  import Simulator from "./Simulator.svelte";
  import Editor from "./Editor.svelte";

  const TABS = {
    SIM: "SIM",
    EDITOR: "EDITOR",
  };
  let tab = TABS.EDITOR;
</script>

<Simulator visible={tab === TABS.SIM} />
{#if tab === TABS.EDITOR}
  <div class="editor-container">
    <Editor/>
  </div>
{/if}
<nav class="nav nav-tabs">
  <li class="nav-items">
    <a class="nav-link" on:click={() => (tab = TABS.SIM)} href="#">Simulator</a>
  </li>
  <li class="nav-items">
    <a class="nav-link" on:click={() => (tab = TABS.EDITOR)} href="#">Editor</a>
  </li>
</nav>

<style>
  .editor-container {
    position: fixed;
    top: 0;
    height: calc(100% - 2rem);
    width: 100%;
  }
  .nav {
    position:fixed;
    bottom: 0;
  }
</style>
