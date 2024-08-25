<template>
  <div class="navbar">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Indian Product Detector</a>
    </div>
    <div class="flex-none hidden md:block">
      <ul class="menu menu-horizontal px-1">
        <li :class="isMenuActive('/')">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li :class="isMenuActive('/detector')">
          <RouterLink to="/detector">Detector</RouterLink>
        </li>
        <li :class="isMenuActive('/information')">
          <RouterLink to="/information">Information</RouterLink>
        </li>
        <li>
            <a href="https://indiaout.today" target="_blank">Indian Brands</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isMenuActive = (path) => {
  return route.path === path ? "bg-gray-200 rounded-lg mx-1" : "";
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #e5e7eb;
}
</style>
