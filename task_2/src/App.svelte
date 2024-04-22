<script lang="ts">
  import { onMount } from "svelte";
  import type { ICurrency } from "./types/ICurrency";

  let rates: ICurrency["rates"] = {};
  let fromCur = "USD";
  let toCur = "EUR";
  let fromAmount = 0;
  let toAmount = 0;

  async function fetchRates(rate: string): Promise<ICurrency> {
    const res = await fetch(`https://open.er-api.com/v6/latest/${rate}`);
    const data: ICurrency = await res.json();
    return data;
  }

  function convert(amount: number, from: string, to: string) {
    return (amount / rates[from]) * rates[to];
  }

  const handleInput = (e: InputEvent, from: boolean) => {
    if (from) {
      fromAmount = parseFloat((e.target as HTMLInputElement).value);
      toAmount = convert(fromAmount, fromCur, toCur);
    } else {
      toAmount = parseFloat((e.target as HTMLInputElement).value);
      fromAmount = convert(toAmount, toCur, fromCur);
    }
  };

  onMount(() => {
    fetchRates(fromCur).then((d) => {
      rates = d.rates;
    });
  });
</script>

<main>
  <!-- Currency component -->
  <article>
    <section>
      <div>
        <input
          type="text"
          list="currency"
          autocomplete="off"
          bind:value={fromCur}
        />
        <datalist id="currency">
          {#each Object.keys(rates) as currency (currency)}
            <option value={currency}>{currency}</option>
          {/each}
        </datalist>
      </div>

      <input
        type="number"
        bind:value={fromAmount}
        on:input={(e) => handleInput(e, true)}
      />
    </section>
    <section></section>
  </article>
  <!-- Currency component -->
  <article>
    <section>
      <div>
        <input
          type="text"
          list="currency"
          autocomplete="off"
          bind:value={toCur}
        />
        <datalist id="currency">
          {#each Object.keys(rates) as currency (currency)}
            <option value={currency}>{currency}</option>
          {/each}
        </datalist>
      </div>

      <input
        type="number"
        bind:value={toAmount}
        on:input={(e) => handleInput(e, false)}
      />
    </section>
    <section></section>
  </article>
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
