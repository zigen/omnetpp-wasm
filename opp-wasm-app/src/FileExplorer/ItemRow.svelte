<script>
    import { createEventDispatcher } from "svelte";
    import { isDir } from "../utils";
    import { opendFiles } from "../opendFiles";
    export let pathname;
    export let abspath;
    const dispatch = createEventDispatcher();
    $: dir = isDir(abspath);
    const changeDirectory = () => dispatch("move", pathname);
    const openFile = () => {
        opendFiles.update((files) => files.concat({ path: abspath }));
    };
    // 🖼 image
</script>

{#if dir}
    <li on:click={changeDirectory}>
        📁 {pathname}
    </li>
{:else}
    <li on:click={openFile}>
        📄 {pathname}
    </li>
{/if}
