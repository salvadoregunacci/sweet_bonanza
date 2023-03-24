// =========================
// Variables
// =========================

// $ - element from DOM

const $selects = document.querySelectorAll('.select');
const $replyReviews = document.querySelectorAll('.review[reply]');
const $replyButtons = document.querySelectorAll('.review__btn');
const $commentArea = document.querySelector('.review__txt');
const $reviewForm = document.querySelector('.review__form');
const $reviewType = document.querySelector('.review__type');
const $replyId = document.querySelector('.review__reply_id');

const $promoSection = document.querySelector('#promo');
const $stickyBlock = document.querySelector('#sticky');
const $stickyCloseBtn = document.querySelector('.sticky__close_btn');

const observer = new IntersectionObserver(stickyVisibleHandler);

// =========================
// Events
// =========================

window.addEventListener("resize", checkTabletDescTable);

if ($promoSection) {
  observer.observe($promoSection);
}

if ($stickyBlock && $stickyCloseBtn) {
  $stickyCloseBtn.addEventListener("click", () => {
    $stickyBlock.removeAttribute("active");
  })
}

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

if ($replyButtons) {
  $replyButtons.forEach(btn => {
    btn.addEventListener("click", replyClick);
  });
}

if ($commentArea) {
  $commentArea.addEventListener("input", () => {
    if ($commentArea.value.length <= 0) {
      $reviewForm.removeAttribute("is_reply");

      if ($reviewType && $replyId) {
        $reviewType.value = "comment";
        $replyId.value = "";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  checkOverflowFetures();
  checkTabletDescTable();
});

// =========================
// Functions
// =========================

function checkTabletDescTable() {
  if (window.innerWidth < 768) {
    const $descTables = document.querySelectorAll('.db_table');

    if ($descTables && $descTables.length > 0) {
      $descTables.forEach(table => {
        _setTabletDescTable(table);
      });
    }
  }

  if (window.innerWidth > 768) {
    _removeTabletTables();
  }

  if (window.innerWidth <= 390) {
    _removeTabletTables();
  }
}

function _removeTabletTables() {
  const $oldTables = document.querySelectorAll('.db_table__tablet');
  if (!$oldTables.length) return;

  $oldTables.forEach(table => table.remove());
}

function _setTabletDescTable(curTable) {
  const $oldTables = document.querySelectorAll('.db_table__tablet');
  const $curTables = document.querySelectorAll('.db_table');

  if ($oldTables.length === ($curTables.length - $oldTables.length)) return;

  const table = document.createElement("table");
  table.classList.add("db_table", "db_table__tablet");
  curTable.after(table);

  let rows = Array.from(curTable.rows);

  rows.forEach(row => {
    const tr_1 = document.createElement("tr");
    const tr_2 = document.createElement("tr");

    tr_1.append(row.cells[0].cloneNode(true), row.cells[1].cloneNode(true));
    tr_2.append(row.cells[2].cloneNode(true), row.cells[3].cloneNode(true));

    table.append(tr_1, tr_2);
  });
}

function stickyVisibleHandler(entries) {
  if (entries[0].isIntersecting) {
    $stickyBlock.removeAttribute("active");
  } else {
    $stickyBlock.setAttribute("active", "");
  }
}

function replyClick(e) {
  const eT = e.target;
  const $curReply = eT.closest(".review");
  let $replyName = $curReply ? $curReply.querySelector(".review__name") : "";

  if ($replyName && $commentArea && $reviewForm && $reviewType && $replyId) {
    $replyName = $replyName.textContent.trim();
    $commentArea.value = `${$replyName}, `;
    $commentArea.focus();
    $reviewForm.setAttribute("is_reply", "");
    $commentArea.scrollIntoView();
    $reviewType.value = "reply";
    $replyId.value = $curReply.getAttribute("review_id");
  }
}

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