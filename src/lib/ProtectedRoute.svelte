<script lang="ts">
  import { navigate } from "svelte-routing";
  import Product from "./Product.svelte";
  import { userState } from "./auth.store";

  $: if (!$userState?.data) {
    navigate("/signIn", { replace: true });
  }
</script>

{#if $userState?.data}
  <Product />
{/if}
