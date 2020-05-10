<script>
  import { onMount } from "svelte";
  import GithubLink from "./GithubLink.svelte";
  import { calculateCells, generateArray } from "./scripts.js";

  $: width = window.innerWidth || 0;

  $: size = calculateCells(width);

  $: cells = generateArray(size);

  function toggle(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      cells[y][x] = !cells[y][x];
    }
  }

  /**
   * Toggles all values in '◇' rhombus shape with center in 'x,y' and given radius
   */
  function toggleRhombus(x, y, radius) {
    if (radius <= 0) {
      toggle(x, y);
    } else {
      for (let j = 0; j < radius; j++) {
        toggle(x - radius + j, y - j); // from left to up
        toggle(x + j, y - radius + j); // from top ro right
        toggle(x + radius - j, y + j); // from right to bottom
        toggle(x - j, y + radius - j); // from bottom to left
      }
    }
  }

  /**
   * Consistently toggles all values, starting from given center
   */
  export const startWave = (x, y, delay = 40) => {
    const iterations = Math.max(x, size - x, y, size - y) * 2;

    for (let i = 0; i <= iterations; i++) {
      try {
        setTimeout(() => toggleRhombus(x, y, i), i * delay);
      } catch {
        // Window size changed during transition, reset
        break;
      }
    }
  };

  onMount(() => {
    setTimeout(() => startWave(0, 0), 400);
  });
</script>

<style>
  .Grid {
    display: grid;
    grid-template-columns: repeat(var(--size), 1fr);

    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0em;

    margin: auto;
  }

  label {
    align-items: center;
    display: flex;
    justify-content: center;

    height: 2em;
    width: 2em;
  }
  input[type="checkbox"] {
    height: 1.25em;
    width: 1.25em;
  }

  @keyframes grow1 {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(2.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes grow2 {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(2.5);
    }
    100% {
      transform: scale(1);
    }
  }

  input[data-checked="false"] {
    animation: grow1 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  input:checked,
  input[data-checked="true"] {
    animation: grow2 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>

<svelte:window bind:innerWidth={width} />
<GithubLink />
<div class="Grid" style="--size: {size}">
  {#each cells as row, y}
    {#each row as checked, x}
      <label>
        <input
          type="checkbox"
          {checked}
          data-checked={checked}
          on:change={() => startWave(x, y)} />
      </label>
    {/each}
  {/each}
</div>
