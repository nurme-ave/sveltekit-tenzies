<script>
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
      <div
        class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-purple-200 px-4 py-6 text-2xl text-black bg-white">
        {die.value}
      </div>
    {/each}
  </div>
  <div class="flex flex-row items-center justify-center gap-6">
    <button
      aria-label="reset game"
      class="w-[7em] rounded-lg bg-red-500 px-4 py-3 text-2xl font-semibold uppercase tracking-wide text-white"
      >Reset</button>
    <button
      aria-label="roll dice"
      class="w-[7em] rounded-lg bg-[#8A2BE2] px-4 py-3 text-2xl font-semibold uppercase tracking-wide text-white"
      >Roll</button>
  </div>
</section>
