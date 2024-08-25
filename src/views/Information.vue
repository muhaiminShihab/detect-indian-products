<template>
  <Header />

  <div class="px-3 pt-3 mb-28">
    <div class="max-w-lg mx-auto">
      <div role="alert" class="alert alert-warning mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span
          >Warning: We detect Indian products by identifying barcodes that start
          with 890. This prefix indicates the number was originally issued by
          the Indian branch of GS1.</span
        >
      </div>

      <p class="mb-4 text-justify">
        The project aims to help Bangladeshi people to detect Indian products
        quickly and efficiently. Our barcode scanner supports multiple barcode
        formats commonly used for retail products. Use the scanner to identify
        products by their barcode, and you can determine if they are from India.
      </p>

      <p>Barcode formats supported:</p>
      <div class="flex gap-3 flex-wrap">
        <span class="border px-4 py-1 rounded-md hover:bg-black hover:text-white transition-all" v-for="format in selectedBarcodeFormats" :key="format">{{ format }}</span>
      </div>
    </div>
  </div>

  <BottomNav />
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import BottomNav from "../components/BottomNav.vue";

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: true, // Commonly used in logistics
  code_39: true, // Commonly used in automotive and defense industries
  code_93: true, // Compact version of Code 39
  codabar: false,
  databar: false, // Sometimes used for labeling fresh food items
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: true, // Used for retail products (International Article Number)
  ean_8: true, // Shorter version of EAN-13 for smaller packages
  itf: true, // Interleaved 2 of 5, used in logistics
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: false, // Common in QR codes but not typically for product barcodes
  rm_qr_code: false,
  upc_a: true, // Used for retail products in North America
  upc_e: true, // Compact version of UPC-A
  linear_codes: true, // General category for 1D barcodes used in products
  matrix_codes: false, // General category for 2D barcodes, typically not used for product barcodes
});

const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  );
});
</script>
