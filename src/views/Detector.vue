<template>
  <Header />

  <div class="px-3">
    <div class="max-w-lg mx-auto mb-28 flex flex-col">
      <!-- alerts -->
      <div role="alert" class="alert my-4 md:order-2" :class="{ 'alert-warning': isIndianProduct, 'alert-info': !isIndianProduct }" v-if="responseMsg">
        <svg
          v-if="!isIndianProduct"
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 md:h-6 md:w-6 shrink-0 stroke-current"
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
        <svg
          v-if="isIndianProduct"
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 md:h-6 md:w-6 shrink-0 stroke-current"
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
        <span>{{ responseMsg }}</span>
      </div>

      <div role="alert" class="alert alert-error my-4 md:order-2" v-if="errorMsg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="-10 w-10 md:h-6 md:w-6 shrink-0 stroke-current"
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

      <!-- scanner -->
      <div v-if="isCameraOn" class="mt-4 md:order-1">
        <label for="" class="font-bold">Scan Barcode:</label>
        <p class="text-gray-500">Scan a barcode to detect the product.</p>

        <QrcodeStream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
          class="rounded-lg overflow-hidden skeleton"
        />
      </div>

      <div v-if="isGalleryOn" class="mt-4 md:order-1">
        <label for="" class="font-bold">Upload Image:</label>
        <p class="text-gray-500">Upload an image to detect the barcode.</p>

        <QrcodeCapture
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
          class="file-input file-input-bordered w-full"
        />
      </div>

      <!-- scan options -->
      <div class="flex justify-center gap-2 my-4 order-3">
        <button
          @click="toggleCamera"
          class="btn btn-info text-white mb-2 md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </button>
        <button
          @click="toggleGallery"
          class="btn btn-success text-white mb-2 md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- bottom nav -->
  <BottomNav />
</template>

<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import BottomNav from "../components/BottomNav.vue";

const isCameraOn = ref(true);
const isGalleryOn = ref(false);
const responseMsg = ref("");
const errorMsg = ref("");
const isIndianProduct = ref(false);

const notify = (message, type) => {
  toast[type](message, {
    position: "bottom-right",
  });
};

const toggleCamera = async () => {
  isCameraOn.value = true;
  isGalleryOn.value = false;

  responseMsg.value = "";
  errorMsg.value = "";

  // await nextTick();
  // scrollToBottom();
};

const toggleGallery = async () => {
  isGalleryOn.value = true;
  isCameraOn.value = false;

  responseMsg.value = "";
  errorMsg.value = "";

  // await nextTick();
  // scrollToBottom();
};

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "auto", // Use 'auto' for instant scrolling
  });
}

/*** detection handling ***/

function onDetect(detectedCodes) {
  // console.log(detectedCodes);
  //   responseMsg.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));

  if (detectedCodes.length == 0) {
    responseMsg.value = "";
    errorMsg.value = "No barcode detected.";
    return;
  }

  let detectedCode =
    detectedCodes.length > 0 ? detectedCodes[0].rawValue : null;

  if (detectedCode) {
    if (detectedCode.startsWith("890")) {
      // console.log("This is an Indian Product.");

      errorMsg.value = "";
      isIndianProduct.value = true;
      responseMsg.value = `This is an Indian Product. Barcode: ${detectedCode}`;
      
    } else {
      // console.log("This is not an Indian Product.");

      errorMsg.value = "";
      isIndianProduct.value = false;
      responseMsg.value = `This is not an Indian Product. Barcode: ${detectedCode}`;
      
    }
  } else {
    // console.log("No barcode detected.");

    errorMsg.value = "";
    isIndianProduct.value = false;
    responseMsg.value = "No barcode detected.";
  }
}

/*** select camera ***/

const selectedConstraints = ref({ facingMode: "environment" });
const defaultConstraintOptions = [
  { label: "rear camera", constraints: { facingMode: "environment" } },
  { label: "front camera", constraints: { facingMode: "user" } },
];
const constraintOptions = ref(defaultConstraintOptions);

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId },
    })),
  ];

  errorMsg.value = "";
}

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);
  }
}

function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#35495e";
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = "#5cb984";
    ctx.fillText(rawValue, centerX, centerY);
  }
}

const trackFunctionOptions = [
  { text: "nothing (default)", value: undefined },
  { text: "outline", value: paintOutline },
  { text: "centered text", value: paintCenterText },
  { text: "bounding box", value: paintBoundingBox },
];

const trackFunctionSelected = ref(trackFunctionOptions[1]);

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

/*** error handling ***/

function onError(err) {
  // errorMsg.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    errorMsg.value += "You need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    errorMsg.value += "No camera found on this device";
  } else if (err.name === "NotSupportedError") {
    errorMsg.value += "Secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    errorMsg.value += "Is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    errorMsg.value += "Installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    errorMsg.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    errorMsg.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    errorMsg.value = err.message;
  }
}
</script>
