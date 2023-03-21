// =========================
// Variables
// =========================

const $selects = document.querySelectorAll('.select');

// =========================
// Events
// =========================

if ($selects) {
  $selects.forEach(select => {
    select.addEventListener("click", selectShowController);
  });
}

// =========================
// Functions
// =========================

function selectShowController(e) {
  const eT = e.target.closest(".select");

  eT.toggleAttribute("active");
}