<script lang="ts">
  import type { ICurrency } from "../types/ICurrency";

  export let rates: ICurrency["rates"] = {};
  export let selectedRate: string = "USD";
</script>

<div>
  <input
    type="text"
    list="currency"
    autocomplete="off"
    bind:value={selectedRate}
  />
  <datalist id="currency">
    {#each Object.keys(rates) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </datalist>
</div>
