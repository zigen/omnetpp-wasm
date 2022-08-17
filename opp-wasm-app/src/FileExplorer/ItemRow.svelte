<script>
    import { createEventDispatcher } from "svelte";
    import { isDir } from "../utils";
    export let pathname;
    export let abspath;
    const dispatch = createEventDispatcher();
    $: dir = isDir(abspath);
    console.log(abspath, dir)
</script>

{#if dir}
    <li
        on:click={() => {
            dispatch("move", pathname);
        }}
    >
        📁 {pathname}
    </li>
{:else}
    <li
        on:click={() => {
            dispatch("open", abspath);
        }}
    >
        {pathname}
    </li>
{/if}
