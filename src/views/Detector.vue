<template>
  <Header />

  <div class="px-3">
    <div class="max-w-lg mx-auto mb-28 flex flex-col">
      <!-- alerts -->
      <div
        role="alert"
        class="alert my-4 md:order-2"
        :class="{
          'alert-warning': isIndianProduct,
          'alert-info': !isIndianProduct,
        }"
        v-if="responseMsg"
      >
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

      <div
        role="alert"
        class="alert alert-error my-4 md:order-2"
        v-if="errorMsg"
      >
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
        <!-- <p class="text-gray-500">Scan a barcode to detect the product.</p> -->

        <QrcodeStream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
          class="rounded-lg overflow-hidden skeleton mt-2"
        />
      </div>

      <div v-if="isGalleryOn" class="mt-4 md:order-1">
        <label for="" class="font-bold">Upload Image:</label>
        <!-- <p class="text-gray-500">Upload an image to detect the barcode.</p> -->

        <!-- <QrcodeCapture
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
          class="file-input file-input-bordered w-full"
        /> -->

        <div
          class="w-full mt-2 py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed"
        >
          <div class="grid gap-1">
            <svg
              class="mx-auto"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="File">
                <path
                  id="icon"
                  d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                  fill="#4F46E5"
                />
              </g>
            </svg>
            <h2 class="text-center text-gray-400 text-xs leading-4">
              PNG, JPG or JPEG, smaller than 15MB
            </h2>
          </div>
          <div class="grid gap-2">
            <h4
              class="text-center text-gray-900 text-sm font-medium leading-snug"
            >
              Drag and Drop your file here or
            </h4>
            <div class="flex items-center justify-center">
              <label>
                <QrcodeCapture
                  :constraints="selectedConstraints"
                  :track="trackFunctionSelected.value"
                  :formats="selectedBarcodeFormats"
                  @error="onError"
                  @detect="onDetect"
                  @camera-on="onCameraReady"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                />
                <!-- <input type="file" hidden /> -->
                <div
                  class="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none"
                >
                  Choose File
                </div>
              </label>
            </div>
          </div>
        </div>
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
