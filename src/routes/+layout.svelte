<script>
  import '../app.css';
  let { children } = $props();
</script>

<main class="grid h-screen place-content-center bg-[#8A2BE2] font-poppins sm:min-h-screen">
  {@render children()}
</main>
