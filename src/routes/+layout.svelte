<script>
  import '../app.css';
  let { children } = $props();
</script>

<main class="min-h-screen w-full overflow-hidden bg-[#8A2BE2] font-poppins">
  <div class="flex min-h-screen w-full items-center justify-center p-4">
    {@render children()}
  </div>
</main>
