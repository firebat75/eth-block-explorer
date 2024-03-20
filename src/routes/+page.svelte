<script>
    import { PUBLIC_API_KEY } from "$env/static/public";
    import { Alchemy, Network } from "alchemy-sdk";
    import { onMount } from "svelte";
    import { BlockPreview } from "components/BlockPreview.svelte";

    const settings = {
        apiKey: PUBLIC_API_KEY,
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);

    /**
     * @type {number}
     */
    let blockNumber;
    async function getBlockNumber() {
        blockNumber = await alchemy.core.getBlockNumber();
        return blockNumber;
    }

    /**
     * @type {import("alchemy-sdk").Block}
     */
    let block;
    async function getBlock() {
        block = await alchemy.core.getBlock(blockNumber);
        return block;
    }

    onMount(async () => {
        console.log("mounting");
        getBlockNumber().then((value) => {
            console.log(value);
            getBlock().then((value) => {
                console.log(value);
            });
        });
    });
</script>

<h1 class="text-3xl font-bold underline">Block Explorer</h1>
<p>Current Block: {blockNumber}</p>
<p>Current Block: {block}</p>
<BlockPreview />
