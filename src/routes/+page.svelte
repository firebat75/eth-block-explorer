<script>
    import { PUBLIC_API_KEY } from "$env/static/public";
    import { Alchemy, Network } from "alchemy-sdk";
    import { onMount } from "svelte";

    const settings = {
        apiKey: PUBLIC_API_KEY,
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(settings);

    /**
     * @type {number}
     */
    let block;
    async function getBlock() {
        block = await alchemy.core.getBlockNumber();
    }

    onMount(async () => {
        getBlock();
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<p>Current Block: {block}</p>
