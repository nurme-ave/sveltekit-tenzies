<script>
  import '../app.css';
  let { children } = $props();
</script>

<main
  class="grid min-h-dvh place-content-center items-center bg-[#8A2BE2] font-poppins xsm:min-h-screen xsm:overflow-y-auto"
>
  {@render children()}
</main>
