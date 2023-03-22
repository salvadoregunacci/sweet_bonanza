// =========================
// Variables
// =========================

const $selects = document.querySelectorAll('.select');
const $replyReviews = document.querySelectorAll('.review[reply]');

// =========================
// Events
// =========================

if ($selects) {
  $selects.forEach(select => {
    select.addEventListener("click", selectShowController);
  });
}
if ($replyReviews) {
  $replyReviews.forEach(reply => {
    const $replyName = reply.querySelector(".review__reply span");

    if ($replyName) {
      $replyName.textContent = reply.getAttribute("reply").trim() || "";
    }
  });
}

document.addEventListener("DOMContentLoaded", checkOverflowFetures);

// =========================
// Functions
// =========================

function selectShowController(e) {
  const eT = e.target.closest(".select");

  eT.toggleAttribute("active");
}

function checkOverflowFetures() {
  const $features = document.querySelectorAll('.feature__items');

  if ($features) {
    $features.forEach(item => {
      if (item.children.length > 4) {
        _toMore(item);
      }
    });
  }

  function _toMore(elem) {
    let $items = Array.from(elem.children);
    const $wrap = elem.closest(".feature__items");

    if ($items && $wrap) {
      $items = $items.slice(4);

      const moreEl = document.createElement("div");
      moreEl.className = "feature__more";

      moreEl.innerHTML = `
        <div class="feature__more_btn">
          <span>Ещё</span>
          <span class="feature__more_count">${$items.length}</span>
        </div>
        <div class="feature__more_content">
        </div>
      `;

      $wrap.append(moreEl);
      const moreContent = elem.querySelector(".feature__more_content");

      if (moreContent) {
        $items.forEach(item => {
          const newEl = document.createElement("div");
          newEl.className = "feature__more_item";
          newEl.textContent = item.textContent.trim();
          moreContent.append(newEl);
        });
      }

      $items.forEach(item => {
        item.remove();
      })
    }
  }
}