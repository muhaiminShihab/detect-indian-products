<template>
  <Header />

  <div class="hero min-h-screen bg-base-200 px-2">
    <div class="container mx-auto">
      <div class="flex justify-center gap-2">
        <button @click="toggleCamera" class="btn btn-info">
          Detect by Camera
        </button>
        <button @click="toggleGallery" class="btn btn-success">
          Detect from Image
        </button>
      </div>

      <div class="mt-16 max-w-lg mx-auto">
        <div v-if="isCameraOn">
          <label for="" class="font-bold">Scan Barcode:</label>
          <p class="text-gray-500">Scan a barcode to detect the product.</p>
          <StreamBarcodeReader
            @decode="onDecode"
            @loaded="onLoaded"
          ></StreamBarcodeReader>
        </div>

        <div v-if="isGalleryOn">
          <label for="" class="font-bold">Upload Image:</label>
          <p class="text-gray-500">Upload an image to detect the barcode.</p>
          <ImageBarcodeReader
            @decode="onDecode"
            @error="onError"
            class="file-input file-input-bordered w-full"
          ></ImageBarcodeReader>
        </div>

        <div role="alert" class="alert alert-success mt-4" v-if="responseMsg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ responseMsg }}</span>
        </div>

        <div role="alert" class="alert alert-error mt-4" v-if="errorMsg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ errorMsg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StreamBarcodeReader, ImageBarcodeReader } from "vue-barcode-reader";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";

const isCameraOn = ref(false);
const isGalleryOn = ref(false);
const responseMsg = ref("");
const errorMsg = ref("");

const notify = (message, type) => {
  toast[type](message, {
    position: "bottom-right",
  });
};

const toggleCamera = () => {
  isCameraOn.value = true;
  isGalleryOn.value = false;
};

const toggleGallery = () => {
  isGalleryOn.value = true;
  isCameraOn.value = false;
};

const onDecode = (result) => {
  console.log("Decoded barcode:", result);
  responseMsg.value = result;
  errorMsg.value = "";
};

const onLoaded = () => {
  // console.log("Barcode reader loaded");
};

const onError = (error) => {
  console.error("Error reading barcode:", error);
  errorMsg.value = error;
  responseMsg.value = "";

  notify("Something went wrong. Please try again.", "error");
};
</script>
