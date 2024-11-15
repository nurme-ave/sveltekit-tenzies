<script>
  import '../app.css';
  let { children } = $props();
</script>

<main class="min-h-screen grid place-content-center bg-[#8A2BE2]">
  {@render children()}
</main>
