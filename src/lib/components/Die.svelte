<script>
  let { value, isHeld, onclick } = $props();
</script>

<button
  {onclick}
  class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-purple-200 px-4 py-6 text-2xl text-black {isHeld
    ? 'bg-[#59E391]'
    : 'bg-white'}">
  {value}
</button>
