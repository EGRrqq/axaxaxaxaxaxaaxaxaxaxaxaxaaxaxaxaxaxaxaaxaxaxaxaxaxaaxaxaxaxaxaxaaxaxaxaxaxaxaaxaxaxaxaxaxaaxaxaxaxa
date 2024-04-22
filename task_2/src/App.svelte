<script lang="ts">
  import { onMount } from "svelte";
  import type { ICurrency } from "./types/ICurrency";

  let rates: ICurrency["rates"] = {};

  async function fetchRates() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data: ICurrency = await res.json();
    rates = data.rates;
  }

  onMount(fetchRates);
  console.log(rates);
</script>

<main>
  <!-- Currency component -->
  <article>
    <section>
      <div>
        <input type="text" list="currency" autocomplete="off" />
        <datalist id="currency">
          {#each Object.keys(rates) as currency (currency)}
            <option value={currency}>{currency}</option>
          {/each}
        </datalist>
      </div>

      <input type="number" value="0" />
    </section>
    <section></section>
  </article>
  <!-- Currency component -->
</main>

<footer>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</footer>

<style>
  article {
    border: solid;
    padding: 1rem;
  }

  main {
    display: flex;
  }
</style>
