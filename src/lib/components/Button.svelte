<script>
  let { text, color, onClick, ariaLabeltext } = $props();
</script>

<button
  aria-label={ariaLabeltext}
  onclick={onClick}
  class="w-[7em] rounded-lg px-4 py-3 text-2xl font-semibold uppercase tracking-wide text-white {color === 'red'
    ? 'bg-red-500'
    : 'bg-[#8A2BE2]'}">{text}</button>
