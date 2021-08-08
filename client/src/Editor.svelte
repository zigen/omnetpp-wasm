<script>
  import { onMount } from "svelte";
  import FileExplorer from "./FileExplorer/Index.svelte";
  import "ace-builds/src-noconflict/ace";
  import "ace-builds/src-noconflict/mode-javascript";
  import "ace-builds/src-noconflict/mode-ini";
  import "ace-builds/src-noconflict/mode-c_cpp";
  import {selectedFileContent, selectedFilePath} from "./store/file";
  let container;
  let editor = null;
  onMount(() => {
    editor = ace.edit(container, {
      selectionStyle: "text",
    });
  });
  selectedFileContent.subscribe(text => {
    if (!editor) return;
    editor.getSession().setValue(text);
    editor.getSession().setMode("ace/mode/c_cpp");
  });
</script>

<h4>editor {$selectedFilePath}</h4>
<div class="container">
  <div class="row">
    <div bind:this={container} class="col-8 editor-container" />
    <div class="col-4">
      <FileExplorer />
    </div>
  </div>
</div>

<style>
  .editor-container {
    height: 100%;
    min-height: calc(100vh - 6rem);
  }
  .container, .row, .col-4 {
    height: 100%;
  }
</style>
