<script>
  import { onMount } from "svelte";
  import { fileSystem } from "./store/simulator";
  export let visible;
  let canvas;
  let qtLoader;
  let statusText = "";
  onMount(() => {
    qtLoader = QtLoader({
      canvasElements: [canvas],
      showLoader: function (loaderStatus) {
        canvas.style.display = "none";
        statusText = "...";
      },
      showError: function (errorText) {
        statusText = errorText;
        canvas.style.display = "none";
      },
      showExit: function () {
        statusText = "Application exit";
        if (qtLoader.exitCode !== undefined)
          statusText += " with code " + qtLoader.exitCode;
        if (qtLoader.exitText !== undefined)
          statusText += " (" + qtLoader.exitText + ")";
        canvas.style.display = "none";
      },
      showCanvas: function () {
        canvas.style.display = "block";
        statusText = "";
      },
    });
    qtLoader.loadEmscriptenModule("quisp");
    let timer;
    timer = setInterval(() => {
      console.log(qtLoader.status);
      if (qtLoader.status === "Running") {
        clearInterval(timer);
        fileSystem.set(FS);
      }
    }, 100);
  });
</script>

<div id="qtstatus">{statusText}</div>
<canvas
  bind:this={canvas}
  id="qtcanvas"
  class={visible ? "" : "hidden"}
  on:contextmenu={(e) => e.preventDefault()}
  contenteditable="true"
/>

<style>
  canvas {
    border: 0px none;
    background-color: white;
    height: 100%;
    width: 100%;
  }
  .hidden {
    transform: translateY(-100%); 
  }
</style>
