<script>
  let { value, isHeld, onclick } = $props();
</script>

<button
  {onclick}
  class="flex aspect-square w-14 items-center justify-center rounded-lg border-2 border-purple-200 text-2xl text-black sm:w-20"
  style="background-color: {isHeld ? '#0BA347' : '#FFF'}; color: {isHeld ? '#FFF' : '#000'}"
>
  {value}
</button>
