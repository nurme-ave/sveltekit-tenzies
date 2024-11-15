<script>
  let { value, isHeld, onclick } = $props();
</script>

<button
  {onclick}
  class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-purple-200 w-14 sm:w-20 aspect-square text-2xl text-black {isHeld
    ? 'bg-[#59E391]'
    : 'bg-white'}">
  {value}
</button>
