<script lang="ts">
  export let amount = 0;
  export let onInput: (
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => void;
</script>

<input type="number" bind:value={amount} on:input={onInput} />
