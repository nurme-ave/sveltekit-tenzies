<script>
  // Imports
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import Die from '$lib/components/Die.svelte';
  import Button from '$lib/components/Button.svelte';
  import { generateNewDiceArray, generateNewDie, saveBestScore } from '$lib/utils/game';
  import { playWinSound } from '$lib/utils/sounds';
  import MuteToggle from '$lib/components/MuteToggle.svelte';

  // State
  let dice = $state(generateNewDiceArray());
  let rolls = $state(0);
  let bestScore = $state(Infinity);
  let allDiceHeld = $state(false);
  let gameWon = $state(false);

  // Initialize best score and entrance animation
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

  // Winner message zoom-in animation
  function zoomIn(node, { duration = 400, delay = 0 }) {
    return {
      delay,
      duration,
      css: (t) => `
        opacity: ${t};
        transform: translate(-50%, -50%) scale(${t});
      `
    };
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
      playWinSound();
      if (bestScore === Infinity || rolls < bestScore) {
        bestScore = rolls;
        saveBestScore(rolls);
      }
    }
  });
</script>

<svelte:head>
  <title>Tenzies - Roll Your Way to Victory</title>
  <meta
    name="description"
    content="Roll, match, and strategize your way to victory in Tenzies! A thrilling dice game where quick decisions and luck combine. Can you get all dice to match?"
  />
  <meta name="keywords" content="tenzies, dice game, browser game, roll dice, strategy game" />
</svelte:head>

<section
  class="relative flex flex-col gap-8 rounded-lg bg-[#F5F5F5] px-4 py-10 text-center sm:max-w-[768px] sm:px-16 sm:py-12 lg:px-20 lg:py-14 3xl:max-w-[1024px] 3xl:gap-10 3xl:px-28 3xl:py-24"
>
  <div class="space-y-0.5">
    <div class="mb-4 flex items-center justify-between 3xl:mb-6">
      <!-- Spacer with same width as button -->
      <div class="w-10"></div>
      <h1 class="text-3xl font-bold uppercase tracking-wide text-[#8A2BE2] sm:text-4xl 3xl:text-5xl">Tenzies</h1>
      <MuteToggle />
    </div>
    <p class="text-base sm:text-lg 3xl:text-2xl">Roll until all dice are the same.</p>
    <p class="text-base sm:text-lg 3xl:text-2xl">Click each die to freeze it at its current value between rolls.</p>
  </div>
  <div class="text-xl font-semibold text-[#000] 3xl:text-2xl">
    <p>Rolls: {rolls}</p>
    <p>Best score: {bestScore === Infinity ? 0 : bestScore}</p>
  </div>
  <div class="mx-auto grid grid-cols-5 grid-rows-2 place-content-center gap-3 lg:gap-4">
    {#each dice as die}
      <Die value={die.value} isHeld={die.isHeld} onclick={() => handleDieClick(die)} />
    {/each}
  </div>
  <div class="flex flex-row items-center justify-center gap-5 sm:gap-6">
    <Button text="Reset" color="#EF4444" onClick={handleReset} ariaLabeltext="reset game" needsConfirmation={true} />
    <Button text="Roll" color="#8A2BE2" onClick={handleRoll} ariaLabeltext="roll dice" />
  </div>

  {#if gameWon}
    <div
      transition:zoomIn
      class="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2
    -translate-y-1/2 transform place-content-center rounded-lg bg-purple-200 px-8 py-6
    text-center text-black shadow-lg sm:h-[85%] sm:w-[85%] sm:px-10 sm:py-8"
    >
      <i class="fa-solid fa-trophy fa-4x mb-4 text-[#ffaa33] sm:mb-6 3xl:mb-8"></i>
      <h2 class="mb-2 text-3xl font-bold uppercase tracking-wide text-[#8A2BE2] sm:mb-4 sm:text-4xl 3xl:text-5xl">
        Winner!
      </h2>
      <div class="text-xl sm:text-2xl 3xl:text-3xl">
        <p class="mb-2">Congratulations!</p>
        <p class="mb-8 sm:mb-12 3xl:mb-16">
          It took you <span class="font-semibold">{rolls}</span>
          {rolls === 1 ? 'roll' : 'rolls'} to win!
        </p>
        <Button text="New Game" color="#8A2BE2" onClick={handleReset} ariaLabeltext="new game" />
      </div>
    </div>
  {/if}
</section>
