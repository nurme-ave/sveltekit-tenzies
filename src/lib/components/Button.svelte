<script>
  let { text, color, onClick, ariaLabeltext } = $props();
</script>

<button
  aria-label={ariaLabeltext}
  onclick={onClick}
  class="w-[7.5em] rounded-lg p-3 text-xl font-semibold uppercase tracking-wide text-white active:scale-95 sm:px-4 sm:py-3 sm:text-2xl 3xl:w-[8em] 3xl:px-8 3xl:py-6 3xl:text-3xl"
  style="background-color: {color}"
>
  {text}
</button>
