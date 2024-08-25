<template>
  <Header />

  <div class="hero h-[90vh] hero-bg">
    <div class="hero-content text-center mt-[-50px]">
      <div class="max-w-lg">
        <h1 class="text-3xl md:text-5xl font-bold">Hi, Bangladeshi!</h1>
        <p class="py-6 text-xl">
          This site will help you to detect Indian products. As a Bangladeshi
          person, you should boycot the Indian products.
        </p>
          <RouterLink to="/detector" class="btn btn-wide btn-primary text-white"
            >Get Started</RouterLink
          >
      </div>
    </div>
  </div>

  <BottomNav />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "../components/Header.vue";
import PatternBg from "../assets/pattern.svg";
import BottomNav from "../components/BottomNav.vue";
</script>

<style>
.gradient {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.hero-bg {
  background-image: url("../assets/pattern.svg");
  background-repeat: repeat;
  background-size: auto;
}
</style>
