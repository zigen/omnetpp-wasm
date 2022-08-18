<script>
    import {readTextFile} from "../utils"
    export let abspath;
    let textContent = readTextFile(abspath);

</script>

{textContent}