<script>
  import Die from '$lib/components/Die.svelte';
  import Button from '$lib/components/Button.svelte';

  let dice = $state(
    Array(10)
      .fill()
      .map(() => generateNewDie())
  );

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    };
  }

  function handleReset() {
    console.log('Reset clicked');
  }

  function handleRoll() {
    console.log('Roll clicked');
  }

  function handleDieClick(die) {
    console.log('Die clicked:', $state.snapshot(die));
  }
</script>

<section
  class="flex max-w-[768px] flex-col gap-8 rounded-lg border border-gray-300 bg-[#F5F5F5] px-16 py-12 text-center">
  <div class="space-y-0.5">
    <h1 class="mb-4 text-5xl font-bold uppercase tracking-wide text-[#8A2BE2]">Tenzies</h1>
    <p class="text-lg">Roll until all dice are the same.</p>
    <p class="text-lg">Click each die to freeze it at its current value between rolls.</p>
  </div>
  <div class="text-xl font-semibold text-[#087533]">
    <p>Rolls: 0</p>
    <p>Best score: 0</p>
  </div>
  <div class="grid grid-cols-5 grid-rows-2 place-content-center gap-4">
    {#each dice as die}
      <Die value={die.value} isHeld={die.isHeld} onclick={() => handleDieClick(die)} />
    {/each}
  </div>
  <div class="flex flex-row items-center justify-center gap-6">
    <Button text="Reset" color="red" onClick={handleReset} ariaLabeltext="reset game" />
    <Button text="Roll" onClick={handleRoll} ariaLabeltext="roll dice" />
  </div>
</section>
