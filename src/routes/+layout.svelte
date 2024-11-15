<script>
  import '../app.css';
  let { children } = $props();
</script>

<main class="grid min-h-screen place-content-center bg-[#8A2BE2]">
  {@render children()}
</main>
