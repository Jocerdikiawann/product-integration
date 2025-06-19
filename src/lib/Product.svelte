<script lang="ts">
  import { onMount } from "svelte";
  import {
    products,
    loading,
    errorData,
    getProducts,
    createProducts,
    updateProduct,
    deleteProduct,
    type ProductDTO,
  } from "./product.store";

  let newProduct = $state({ name: "", description: "", price: "" });
  let editProduct: ProductDTO | null = $state(null);
  let searchQuery = $state("");
  let minPrice = $state("");
  let maxPrice = $state("");

  // Fetch products on mount
  onMount(async () => {
    await getProducts();
  });

  // Handle search with debounce
  let searchTimeout: number;
  $effect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const min = minPrice ? parseFloat(minPrice) : null;
      const max = maxPrice ? parseFloat(maxPrice) : null;
      await getProducts(searchQuery || null, min, max);
    }, 300);
  });

  async function handleCreateOrUpdate() {
    if (editProduct) {
      // Update existing product
      await updateProduct(
        editProduct.id,
        newProduct.name,
        newProduct.description,
        parseFloat(newProduct.price)
      );
      editProduct = null;
    } else {
      // Create new product
      await createProducts(
        newProduct.name,
        newProduct.description,
        parseFloat(newProduct.price)
      );
    }
    newProduct = { name: "", description: "", price: "" };
  }

  function startEdit(product: ProductDTO) {
    editProduct = product;
    newProduct = {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
    };
  }

  function cancelEdit() {
    editProduct = null;
    newProduct = { name: "", description: "", price: "" };
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatPrice(price: number) {
    return `Rp ${price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`;
  }

  $effect(() => {
    console.log("Success " + JSON.stringify($products));
  });
</script>

<div
  class="fixed inset-0 flex flex-col justify-center items-center bg-white p-5 z-50"
>
  <div class="w-full max-w-md flex flex-col gap-4">
    {#if $errorData}
      <div class="p-2 bg-red-100 text-red-700 rounded">
        {$errorData}
      </div>
    {/if}

    {#if $loading}
      <div class="text-center text-gray-500">Loading...</div>
    {/if}

    <div class="flex flex-col gap-2">
      <input
        bind:value={newProduct.name}
        type="text"
        placeholder="Product name..."
        class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        bind:value={newProduct.description}
        placeholder="Product description..."
        class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      ></textarea>
      <input
        bind:value={newProduct.price}
        type="number"
        step="0.01"
        placeholder="Price (e.g., 99.99)"
        class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div class="flex gap-2">
        {#if editProduct}
          <button
            onclick={handleCreateOrUpdate}
            class="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Update Product
          </button>
          <button
            onclick={cancelEdit}
            class="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        {:else}
          <button
            onclick={handleCreateOrUpdate}
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        {/if}
      </div>
    </div>

    <input
      bind:value={searchQuery}
      type="text"
      placeholder="Search by name or description..."
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div class="flex gap-2">
      <input
        bind:value={minPrice}
        type="number"
        step="0.01"
        placeholder="Min price..."
        class="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        bind:value={maxPrice}
        type="number"
        step="0.01"
        placeholder="Max price..."
        class="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
      {#each $products as item}
        <div class="flex flex-col gap-1 p-3 bg-gray-100 rounded">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold">{item.name}</h3>
            <div class="flex gap-2">
              <button
                onclick={() => startEdit(item)}
                class="px-2 py-1 text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>
              <button
                onclick={() => deleteProduct(item.id)}
                class="px-2 py-1 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-600">{item.description}</p>
          <p class="text-sm font-medium">{formatPrice(item.price)}</p>
          <p class="text-sm text-gray-500">
            Created: {formatDate(item.createdAt)}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
