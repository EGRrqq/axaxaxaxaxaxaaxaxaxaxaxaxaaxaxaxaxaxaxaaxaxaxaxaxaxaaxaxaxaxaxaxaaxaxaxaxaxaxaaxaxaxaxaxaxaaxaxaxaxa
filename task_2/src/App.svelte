<script lang="ts">
  import { onMount } from "svelte";

  import CurrencySelector from "./lib/CurrencySelector.svelte";
  import CurrencyAmount from "./lib/CurrencyAmount.svelte";

  import type { ICurrency } from "./types/ICurrency";

  let rates: ICurrency["rates"] = {};

  let baseCur = "USD";
  let convertedCur = "EUR";

  let baseAmount = 0;
  let convertedAmount = 0;

  async function fetchRates(rate: string): Promise<ICurrency> {
    const res = await fetch(`https://open.er-api.com/v6/latest/${rate}`);
    const data: ICurrency = await res.json();
    return data;
  }

  function convert(amount: number, from: string, to: string) {
    return (amount / rates[from]) * rates[to];
  }

  function handleInput(
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
    from: boolean
  ) {
    if (from) {
      baseAmount = parseFloat((e.target as HTMLInputElement).value);
      convertedAmount = convert(baseAmount, baseCur, convertedCur);
      return;
    }

    convertedAmount = parseFloat((e.target as HTMLInputElement).value);
    baseAmount = convert(convertedAmount, convertedCur, baseCur);
  }

  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
    from: boolean
  ) {
    if (!Object.keys(rates).includes((e.target as HTMLInputElement).value))
      return;

    if (from) {
      baseCur = (e.target as HTMLInputElement).value;
      convertedAmount = convert(baseAmount, baseCur, convertedCur);

      return;
    }

    convertedCur = (e.target as HTMLInputElement).value;
    baseAmount = convert(convertedAmount, convertedCur, baseCur);
  }

  onMount(() => {
    fetchRates(baseCur).then((d) => (rates = d.rates));
  });
</script>

<main>
  <article>
    <section>
      <div>
        <CurrencySelector
          {rates}
          onChange={(e) => handleChange(e, true)}
          bind:selectedRate={baseCur}
        />
      </div>

      <CurrencyAmount
        bind:amount={baseAmount}
        onInput={(e) => handleInput(e, true)}
      />
    </section>

    <section>
      <div>
        <CurrencySelector
          onChange={(e) => handleChange(e, false)}
          {rates}
          bind:selectedRate={convertedCur}
        />
      </div>

      <CurrencyAmount
        bind:amount={convertedAmount}
        onInput={(e) => handleInput(e, false)}
      />
    </section>
  </article>
</main>

<footer>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</footer>

<style>
  article {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    border: solid;
  }
</style>
