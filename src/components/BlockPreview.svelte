<script>
  import { IconCube, IconPick } from "@tabler/icons-svelte";
  import { alchemy } from "$lib/stores";
  import { onMount } from "svelte";
  /**
   * @type {number}
   */
  export let blockNumber;

  /**
   * @type {import("alchemy-sdk").Block}
   */
  let block = {
    hash: "0x0",
    parentHash: "0x0",
    number: 0,
    timestamp: 0,
    nonce: "0x0000000000000042",
    difficulty: 1,
    gasLimit: {
      type: "BigNumber",
      hex: "0x0000",
    },
    gasUsed: {
      type: "BigNumber",
      hex: "0x00",
    },
    miner: "0x0000000000000000000000000000000000000000",
    extraData: "0",
    transactions: [],
    _difficulty: {
      type: "BigNumber",
      hex: "0x0400000000",
    },
  };
  async function getBlock() {
    return await alchemy.core.getBlock(blockNumber);
  }

  let date = new Date(0);
  onMount(async () => {
    console.log("mounting block preview", blockNumber);
    getBlock().then((value) => {
      block = value;
      date = new Date(block.timestamp * 1000);
      console.log("block retrieved", blockNumber);
      console.log(block);
    });
  });
</script>

<div class="card card-compact w-96 bg-neutral shadow-xl rounded m-2">
  <div class="card-body divide-y divide-neutral-content">
    <div class="inline-flex align-middle rounded">
      <div class="mr-1 p-1 h-min">
        <IconCube size={48} />
      </div>
      <div>
        <h2 class="card-title">Block #{blockNumber}</h2>
        <p>
          {`Timestamp: ${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`}
        </p>
      </div>
    </div>
    <div class="pl-1 pt-1">
      <p>Total Transactions: {block.transactions.length}</p>
      <p>Miner: {block.miner.slice(0, 6)}...{block.miner.slice(-5, -1)}</p>
      <p>Gas Limit: {block.gasLimit}</p>
      <p>Gas Used: {block.gasUsed}</p>
    </div>
  </div>
</div>
