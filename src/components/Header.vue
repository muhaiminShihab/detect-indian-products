<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Indian Product Detector</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li :class="isMenuActive('/')">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li :class="isMenuActive('/detector')">
          <RouterLink to="/detector">Detector</RouterLink>
        </li>
        <!-- Additional menu items can be added here -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isMenuActive = (path) => {
  return route.path === path ? "bg-gray-300 rounded-lg mx-1" : "";
};
</script>
