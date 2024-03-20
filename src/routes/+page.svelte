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
    return await alchemy.core.getBlockNumber();
  }

  onMount(async () => {
    console.log("mounting home page");
    getBlockNumber().then((value) => {
      blockNumber = value;
      console.log("block number retrieved", blockNumber);
    });
  });
</script>

<h1 class="text-3xl font-bold underline">Block Explorer</h1>
<div>
  <h3>Recent Blocks</h3>
  {#each { length: 4 } as _, i}
    <BlockPreview blockNumber={blockNumber - i} />
  {/each}
</div>
