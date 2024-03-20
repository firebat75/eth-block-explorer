<script>
  import { PUBLIC_API_KEY } from "$env/static/public";
  import { Alchemy, Network } from "alchemy-sdk";
  import { onMount } from "svelte";
  import BlockPreview from "../components/BlockPreview.svelte";

  const settings = {
    apiKey: PUBLIC_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  /**
   * @type {number}
   */
  let blockNumber = 0;
  async function getBlockNumber() {
    blockNumber = await alchemy.core.getBlockNumber();
    return blockNumber;
  }

  onMount(async () => {
    console.log("mounting home page");
    getBlockNumber().then((value) => {
      console.log("block number retrieved", value);
    });
  });
</script>

<h1 class="text-3xl font-bold underline">Block Explorer</h1>
<p>Current Block: {blockNumber}</p>
<BlockPreview {blockNumber} />
