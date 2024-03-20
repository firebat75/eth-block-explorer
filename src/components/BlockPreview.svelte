<script>
  import { IconCube } from "@tabler/icons-svelte";
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
      var dateString = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}-${date.getDate()}`;
      console.log("block retrieved", blockNumber);
    });
  });
</script>

<div class="card w-96 bg-neutral shadow-xl">
  <div class="card-body">
    <div>
      <IconCube />
      <h2 class="card-title">Block #{blockNumber}</h2>
    </div>
    <div>
      <p>{block.transactions.length} txns</p>
      <p>
        {`Timestamp: ${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`}
      </p>
    </div>
    <h2 class="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
<p>hello</p>
<IconCube />
