<template>
  <div class="navbar bg-base-200">
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
  return route.path === path ? "bg-gray-300 rounded-lg mx-1" : "";
};
</script>
