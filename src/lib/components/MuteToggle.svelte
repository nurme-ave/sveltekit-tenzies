<script>
  import { onMount } from 'svelte';
  import audioStore, { toggleMute } from '$lib/stores/audioStore';

  let isMuted = $state(false);

  // Subscribe to store changes
  onMount(() => {
    const unsubscribe = audioStore.subscribe((state) => {
      isMuted = state.isMuted;
    });

    return unsubscribe;
  });
</script>

<div class="flex items-center gap-2 md:gap-3">
  <button
    onclick={toggleMute}
    class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300 transition-colors duration-200 sm:hover:bg-purple-400"
    aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
  >
    {#if isMuted}
      <i class="fas fa-volume-mute text-black"></i>
    {:else}
      <i class="fas fa-volume-up text-black"></i>
    {/if}
  </button>
</div>
