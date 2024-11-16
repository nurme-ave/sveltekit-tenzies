<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Die from '$lib/components/Die.svelte';
  import Button from '$lib/components/Button.svelte';

  let showContent = $state(false);
  let dice = $state(generateNewDiceArray());
  let rolls = $state(0);
  let bestScore = $state(0);
  let allDiceHeld = $state(false);
  let gameWon = $state(false);

  onMount(() => {
    bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    setTimeout(() => {
      showContent = true;
    }, 500); // Small delay before unveiling
  });

  function generateNewDiceArray() {
    return Array(10)
      .fill()
      .map(() => generateNewDie());
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    };
  }

  function handleReset() {
    dice = generateNewDiceArray();
    rolls = 0;
    allDiceHeld = false;
    gameWon = false;
  }

  function handleRoll() {
    rolls++;
    dice = dice.map((die) => (die.isHeld ? die : generateNewDie()));
  }

  function handleDieClick(die) {
    die.isHeld = !die.isHeld;
  }

  $effect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    gameWon = allDiceHeld && allSameValue;
  });

  $effect(() => {
    if (gameWon && rolls < bestScore) {
      bestScore = rolls;
      localStorage.setItem('bestScore', rolls.toString());
    }
  });
</script>

<section class="relative overflow-hidden">
  <div
    class="mx-0 flex w-screen flex-col gap-8 border-y border-gray-300 bg-[#F5F5F5] px-4 py-8 text-center
    sm:mx-auto sm:w-full sm:max-w-[768px] sm:rounded-lg sm:border sm:px-16 sm:py-12 lg:px-20 lg:py-14"
  >
    <div class="space-y-0.5">
      <h1 class="mb-4 text-3xl font-bold uppercase tracking-wide text-[#8A2BE2] sm:text-4xl">Tenzies</h1>
      <p class="text-base sm:text-lg">Roll until all dice are the same.</p>
      <p class="text-base sm:text-lg">Click each die to freeze it at its current value between rolls.</p>
    </div>
    <div class="text-xl font-semibold text-[#000]">
      {#if gameWon}
        <p>Congratulations! It took you {rolls} rolls to win!</p>
      {:else}
        <p>Rolls: {rolls}</p>
      {/if}

      <p>Best score: {bestScore}</p>
    </div>
    <div class="mx-auto grid grid-cols-5 grid-rows-2 place-content-center gap-3 lg:gap-4">
      {#each dice as die}
        <Die value={die.value} isHeld={die.isHeld} onclick={() => handleDieClick(die)} />
      {/each}
    </div>
    <div class="flex flex-row items-center justify-center gap-6">
      {#if gameWon}
        <Button text="New Game" color="#8A2BE2" onClick={handleReset} ariaLabeltext="new game" />
      {:else}
        <Button text="Reset" color="#EF4444" onClick={handleReset} ariaLabeltext="reset game" />
        <Button text="Roll" color="#8A2BE2" onClick={handleRoll} ariaLabeltext="roll dice" />
      {/if}
    </div>
  </div>

  {#if !showContent}
    <div transition:fly={{ duration: 10000, y: 1000 }} class="absolute inset-0 bg-[#8A2BE2] sm:rounded-lg"></div>
  {/if}
</section>
