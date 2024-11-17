<script>
  // Imports
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import Die from '$lib/components/Die.svelte';
  import Button from '$lib/components/Button.svelte';
  import { generateNewDiceArray, generateNewDie, saveBestScore } from '$lib/utils/game';

  // State
  let dice = $state(generateNewDiceArray());
  let rolls = $state(0);
  let bestScore = $state(Infinity);
  let allDiceHeld = $state(false);
  let gameWon = $state(false);

  // Initialize best score, entrance animation and window height
  onMount(() => {
    try {
      const savedScore = localStorage.getItem('bestScore');
      if (savedScore !== null && savedScore !== '0') {
        bestScore = parseInt(savedScore);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  });

  // Game handlers
  function handleReset() {
    dice = generateNewDiceArray();
    rolls = 0;
    allDiceHeld = false;
    gameWon = false;
    saveBestScore(bestScore);
  }

  function handleRoll() {
    rolls++;
    dice = dice.map((die) => (die.isHeld ? die : generateNewDie()));
  }

  function handleDieClick(die) {
    die.isHeld = !die.isHeld;
  }

  // Effects
  $effect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    gameWon = allDiceHeld && allSameValue;
  });

  $effect(() => {
    if (gameWon) {
      if (bestScore === Infinity || rolls < bestScore) {
        bestScore = rolls;
        saveBestScore(rolls);
      }
    }
  });
</script>

<section
  class="relative flex flex-col gap-8 rounded-lg bg-[#F5F5F5] px-4 py-8 text-center sm:max-w-[768px] sm:px-16 sm:py-12 lg:px-20 lg:py-14"
>
  <div class="space-y-0.5">
    <h1 class="mb-4 text-3xl font-bold uppercase tracking-wide text-[#8A2BE2] sm:text-4xl">Tenzies</h1>
    <p class="text-base sm:text-lg">Roll until all dice are the same.</p>
    <p class="text-base sm:text-lg">Click each die to freeze it at its current value between rolls.</p>
  </div>
  <div class="text-xl font-semibold text-[#000]">
    <p>Rolls: {rolls}</p>
    <p>Best score: {bestScore === Infinity ? 0 : bestScore}</p>
  </div>
  <div class="mx-auto grid grid-cols-5 grid-rows-2 place-content-center gap-3 lg:gap-4">
    {#each dice as die}
      <Die value={die.value} isHeld={die.isHeld} onclick={() => handleDieClick(die)} />
    {/each}
  </div>
  <div class="flex flex-row items-center justify-center gap-3 sm:gap-6">
    {#if gameWon}
      <Button text="New Game" color="#8A2BE2" onClick={handleReset} ariaLabeltext="new game" />
    {:else}
      <Button text="Reset" color="#EF4444" onClick={handleReset} ariaLabeltext="reset game" />
      <Button text="Roll" color="#8A2BE2" onClick={handleRoll} ariaLabeltext="roll dice" />
    {/if}
  </div>

  {#if gameWon}
    <div
      transition:scale={{
        duration: 400,
        easing: elasticOut,
        start: 0.3
      }}
      class="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2
    -translate-y-1/2 transform place-content-center rounded-lg bg-purple-200 px-8 py-6
    text-center text-black shadow-lg sm:h-[85%] sm:w-[85%] sm:px-10 sm:py-8"
    >
      <h2 class="mb-2 text-2xl font-bold uppercase tracking-wide text-[#8A2BE2] sm:text-3xl lg:text-4xl">Winner!</h2>
      <div class="text-lg sm:text-xl lg:text-2xl">
        <p>Congratulations!</p>
        <p class="mb-4">
          It took you {rolls}
          {rolls === 1 ? 'roll' : 'rolls'} to win!
        </p>
        <Button text="New Game" color="#8A2BE2" onClick={handleReset} ariaLabeltext="new game" />
      </div>
    </div>
  {/if}
</section>
