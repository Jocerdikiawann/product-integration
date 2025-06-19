<script lang="ts">
  import SignIn from "./lib/SignIn.svelte";
  import { Route, Router } from "svelte-routing";
  import SignUp from "./lib/SignUp.svelte";
  import Splash from "./lib/Splash.svelte";
  import ProtectedRoute from "./lib/ProtectedRoute.svelte";
</script>

<main>
  <Router>
    <Route path="/"><Splash /></Route>
    <Route path="/signIn"><SignIn /></Route>
    <Route path="/register"><SignUp /></Route>
    <Route path="/product"><ProtectedRoute /></Route>
  </Router>
</main>
