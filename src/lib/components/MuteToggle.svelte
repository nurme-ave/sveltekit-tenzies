<script>
  import audioStore, { toggleMute } from '$lib/stores/audioStore';
</script>

<div class="flex items-center gap-2 md:gap-3">
  <button
    onclick={toggleMute}
    class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300 transition-colors duration-200 sm:hover:bg-purple-400"
    aria-label={$audioStore.isMuted ? 'Unmute sound' : 'Mute sound'}
  >
    {#if $audioStore.isMuted}
      <i class="fas fa-volume-mute text-black"></i>
    {:else}
      <i class="fas fa-volume-up text-black"></i>
    {/if}
  </button>
</div>
