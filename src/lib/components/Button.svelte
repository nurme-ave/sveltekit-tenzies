<script>
  let { text, color, onClick, ariaLabeltext } = $props();
</script>

<button
  aria-label={ariaLabeltext}
  onclick={onClick}
  class="w-[7.5em] rounded-lg p-3 text-xl font-semibold uppercase tracking-wide text-white sm:px-4 sm:py-3 sm:text-2xl"
  style="background-color: {color}"
>
  {text}
</button>
