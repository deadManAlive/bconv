<script>
    import { onMount } from "svelte";

    import Float32 from "./Float32.svelte";

    let main;

    onMount(async() => {
        const height = main.clientHeight;

        window.parent.postMessage(
            {
                bconvHeight: height,
            },
            "*"
        );
    });

    function resizeCallback() {
        const height = main.clientHeight;

        window.parent.postMessage(
            {
                bconvHeight: height,
            },
            "*"
        );
    }
</script>

<svelte:window on:resize={resizeCallback} />

<main bind:this={main}>
    <Float32 />
</main>