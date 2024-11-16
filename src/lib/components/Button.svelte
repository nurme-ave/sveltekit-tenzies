<script>
  let { text, color, onClick, ariaLabeltext } = $props();
</script>

<button
  aria-label={ariaLabeltext}
  onclick={onClick}
  class="w-[6em] rounded-lg px-4 py-3 text-xl font-semibold uppercase tracking-wide text-white sm:w-[7em] sm:text-2xl"
  style="background-color: {color}"
>
  {text}
</button>
