<script>
  let { value, isHeld, onclick } = $props();
</script>

<button
  {onclick}
  class="flex aspect-square w-16 items-center justify-center rounded-lg border-2 border-purple-200 text-2xl text-black sm:w-20"
  style="background-color: {isHeld ? '#E9D5FF' : '#FFF'}"
>
  {value}
</button>
