<script lang="ts">
  import type { ICurrency } from "../types/ICurrency";

  export let rates: ICurrency["rates"] = {};
  export let selectedRate: string = "USD";
  export let onChange: (
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => void;
</script>

<input
  type="text"
  list="currency"
  autocomplete="off"
  on:change={onChange}
  bind:value={selectedRate}
/>
<datalist id="currency">
  {#each Object.keys(rates) as currency}
    <option value={currency}>{currency}</option>
  {/each}
</datalist>

<style>
  input {
    width: 100%;
  }
</style>
