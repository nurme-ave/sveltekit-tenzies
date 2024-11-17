<script>
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

  let { text, color, onClick, ariaLabeltext, needsConfirmation = false } = $props();
  let showConfirmDialog = $state(false);

  function handleClick() {
    if (needsConfirmation) {
      showConfirmDialog = true;
    } else {
      onClick();
    }
  }

  function handleConfirm() {
    onClick();
    showConfirmDialog = false;
  }

  function handleCancel() {
    showConfirmDialog = false;
  }
</script>

<div>
  <button
    onclick={handleClick}
    class="w-[7.5em] rounded-lg p-3 text-xl font-semibold uppercase tracking-wide text-white active:scale-95 sm:px-4 sm:py-3 sm:text-2xl 3xl:w-[8em] 3xl:px-8 3xl:py-6 3xl:text-3xl"
    style="background-color: {color}"
    aria-label={ariaLabeltext}
  >
    {text}
  </button>

  <ConfirmDialog isOpen={showConfirmDialog} onConfirm={handleConfirm} onCancel={handleCancel} />
</div>
