<script>
  let { value, isHeld, onclick } = $props();
</script>

<button
  {onclick}
  class="flex aspect-square w-14 items-center justify-center rounded-lg border-2 border-purple-200 text-2xl text-black sm:w-20 {isHeld
    ? 'bg-[#59E391]'
    : 'bg-white'}">
  {value}
</button>
