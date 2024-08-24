<template>
  <Header />

  <div class="hero gradient min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-3xl md:text-5xl font-bold">Hi, Bangladeshi!</h1>
        <p class="py-6">
          This site will help you to detect Indian products. As a Bangladeshi
          person, you should boycot the Indian products.
        </p>
        <RouterLink to="/detector" class="btn btn-primary text-white"
          >Get Started</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "../components/Header.vue";
</script>

<style>
.gradient {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
</style>
