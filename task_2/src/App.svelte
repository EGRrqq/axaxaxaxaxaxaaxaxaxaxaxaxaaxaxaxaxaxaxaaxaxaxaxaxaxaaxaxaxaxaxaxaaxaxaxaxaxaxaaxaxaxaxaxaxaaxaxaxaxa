<script lang="ts">
</script>

<main>
  <!-- Currency component -->
  <article>
    <section>
      <div>
        <input type="text" list="currency" autocomplete="off" />
        <datalist id="currency">
          <option value="eur">eur</option>
          <option value="usd">usd</option>
        </datalist>
      </div>

      <input type="number" value="0" />
    </section>
    <section></section>
  </article>

  <!-- Currency component -->
  <article>
    <section>
      <div>
        <input type="text" list="currency" autocomplete="off" />
        <datalist id="currency">
          <option value="eur">eur</option>
          <option value="usd">usd</option>
        </datalist>
      </div>

      <input type="number" value="0" />
    </section>
    <section></section>
  </article>
</main>

<style>
  article {
    border: solid;
    padding: 1rem;
  }

  main {
    display: flex;
  }
</style>
