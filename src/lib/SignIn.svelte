<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import {
    isAuthenticated,
    login,
    userState,
    authError,
    loading,
  } from "./auth.store";

  let username: string = "";
  let password: string = "";

  const handleSubmit = async () => {
    if (!$loading) {
      await login(username, password);

      const isAuth = $isAuthenticated;
      if (isAuth) navigate("/product");
      if (!isAuth || $authError != null) window.alert($userState?.message);
    }
  };
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="username" class="block text-sm/6 font-medium text-gray-900"
          >Username</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            bind:value={username}
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm/6 font-medium text-gray-900"
          >Password</label
        >
        <div class="mt-2">
          <input
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            bind:value={password}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class={`${$loading ? "animate-pulse " : ""}flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >Sign in</button
        >
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      <Link
        class="font-semibold text-indigo-600 hover:text-indigo-500"
        to="/register">Register here</Link
      >
    </p>
  </div>
</div>
