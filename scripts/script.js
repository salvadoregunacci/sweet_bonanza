// =========================
// Variables
// =========================

const $selectLang = document.querySelector('.select_lang');
const $lbFullWrap = document.querySelectorAll('.lightbox__full');
const $lbCloseZoom = document.querySelectorAll('.lightbox__zoom_close');
const $lbThumbnails = document.querySelectorAll('.lightbox__thumb');
const $lbZoom = document.querySelectorAll('.lightbox__zoom');
const $faqTitles = document.querySelectorAll('.faq__item_title');
const $burgerBtn = document.querySelector('.header__burger');
const $navigation = document.querySelector('.navigation');
const $navigationItems = document.querySelectorAll('.navigation li');
const $mainContainer = document.querySelector('#main');

// modals
const $modalsWrap = document.getElementById('modals');
const $startPopup = document.querySelector('.start_popup');
const $startPopupCloseBtn = document.querySelector('.start_popup__close_btn');
const $copyPromocodeBtn = document.querySelector('.start_popup__promocode_copy');
const $promocode = document.querySelector('.start_popup__promocode');

// showcase
const $btnShowAllShowcase = document.querySelector('.sc_show_all_btn');
const $showcaseSection = document.getElementById("showcase");
const $showcaseBtnWrap = document.querySelector('.sc_show__btn_wrap');

// video
const $videoSource = document.querySelector('#player');
const $videoDummy = document.querySelector('.video__dummy');

// =========================
// Events
// =========================

$selectLang?.addEventListener("click", () => {
  $selectLang.toggleAttribute("active");
});

$lbFullWrap?.forEach(fullWrap => {
  fullWrap.addEventListener("click", (e) => openZoomContainer(e));
});

$lbCloseZoom?.forEach(btnClose => {
  btnClose.addEventListener("click", (e) => closeZoomContainer(e));
});

$lbThumbnails?.forEach(thumb => {
  thumb.addEventListener("click", (e) => openMdImg(e));
});

$lbZoom?.forEach(zoomContainer => {
  zoomContainer.addEventListener("click", (e) => closeZoomContainer(e));
});

$faqTitles?.forEach(faq => {
  faq.addEventListener("click", (e) => {
    const curItem = e.target.closest(".faq__item");

    curItem.toggleAttribute("active");
    document.querySelectorAll('.faq__item').forEach(item => item !== curItem ? item.removeAttribute("active") : null);

  });
});

$burgerBtn?.addEventListener("click", () => {
  $burgerBtn.classList.toggle("active");
  $navigation.toggleAttribute("active");
  $mainContainer.toggleAttribute("menu-active");
});

$videoDummy?.addEventListener("click", aploadVideo);
$videoDummy?.addEventListener("touchend", aploadVideo);

// close menu if click link
$navigationItems.forEach(li => {
  li.addEventListener("click", () => {
    if ($burgerBtn.classList.contains("active")) {
      $burgerBtn.classList.remove("active");
      $navigation.removeAttribute("active");
      $mainContainer.removeAttribute("menu-active");
    }
  });
});

// show all items showcase
$btnShowAllShowcase?.addEventListener("click", ()=> {
  $showcaseSection.setAttribute("open", "");
});

window.addEventListener("load", showStartPopup);
$startPopupCloseBtn?.addEventListener("click", closeStartPopup);
$copyPromocodeBtn?.addEventListener("click", copyPromocode);

// check count items showcase
window.addEventListener("load", ()=> {
  const $showcaseItems = document.querySelectorAll('.sc_item');

  if ($showcaseItems && $showcaseBtnWrap) {
    if ($showcaseItems.length <= 4) {
      $showcaseBtnWrap.style.display = "none";
    }
  }
});

// =========================
// Functions
// =========================

function aploadVideo() {
  $videoDummy.remove();
  $videoSource.removeAttribute("hidden");

  const scriptYt = document.createElement("script");
  scriptYt.src = "https://www.youtube.com/iframe_api";
  document.body.append(scriptYt);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '_v2tujImw7Y',
    events: {
        'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(e) {
    e.target.playVideo();
}

function openZoomContainer(e) {
  const $curLightbox = e.target.closest(".lightbox");
  const $curMdImg = $curLightbox.querySelector(".lightbox__full img");
  const $curMdImgSm = $curLightbox.querySelector(".lightbox__full source");
  const $zoomContainer = $curLightbox.querySelector(".lightbox__zoom");
  const $zoomImg = $zoomContainer?.querySelector("img");


  if (window.innerWidth <= 400) {
    $zoomImg.src = $curMdImgSm.srcset;
  } else {
    $zoomImg.src = $curMdImg.src;
  }
  $zoomContainer?.setAttribute("active", "");
}

function closeZoomContainer(e = null) {
  if (e) {
    const $zoomContainer = e.target?.closest(".lightbox__zoom");
    $zoomContainer?.removeAttribute("active");
  }
}

function openMdImg(e) {
  const $curThumbImg = e.target.querySelector("img");
  const $curThumbImgSm = e.target.querySelector("source");
  const $curLightbox = e.target.closest(".lightbox");
  const $curMdImg = $curLightbox.querySelector(".lightbox__full img");
  const $curMdImgSm = $curLightbox.querySelector(".lightbox__full source");
  let temp = $curThumbImg.src;

  if (window.innerWidth <= 400) {
    temp = $curThumbImgSm.srcset;
    $curThumbImgSm.srcset = $curMdImgSm.srcset;
    $curMdImgSm.srcset = temp;
  } else {
    $curThumbImg.src = $curMdImg.src;
    $curMdImg.src = temp;
  }
}

function showStartPopup() {
  // settings start popup
  const cookie = JSON.parse(localStorage.getItem("startPopup"));

  if ($startPopup?.hasAttribute("hide")) return;

  // once ---------
  if ($startPopup?.hasAttribute("once")) {
    if (cookie && cookie.once) {
      if (cookie.once.includes(location.href)) {
        return;
      } else {
        cookie.once.push(location.href);
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      }
    } else {
      if (cookie) {
        if (cookie.once) {
          cookie.once.push({ href: location.href, count: 1 });
        } else {
          cookie.once = [{ href: location.href, count: 1 }];
        }

        localStorage.setItem("startPopup", JSON.stringify(cookie));
      } else {
        localStorage.setItem("startPopup", JSON.stringify({ once: [location.href] }));
      }
    }
  }
  // repeat ---------
  if ($startPopup?.hasAttribute("repeat")) {
    if (cookie && cookie.repeat) {
      if (cookie.repeat.find(item => item.href === location.href && item.count < +$startPopup.getAttribute("repeat"))) {
        cookie.repeat.forEach(item => {
          item.count = item.href === location.href ? +item.count + 1 : item.count;
        });
        localStorage.setItem("startPopup", JSON.stringify(cookie));
        return;
      } else {
        cookie.repeat.forEach(item => {
          item.count = item.href === location.href ? 1 : item.count;
        });

        if (!(cookie.repeat.find(item => item.href === location.href)) && cookie.repeat.length > 0) {
          cookie.repeat.push({ href: location.href, count: 1 });
        }

        if (cookie.repeat.length === 0) {
          cookie.repeat = [{ href: location.href, count: 1 }];
          localStorage.setItem("startPopup", JSON.stringify(cookie));
        } else {
          localStorage.setItem("startPopup", JSON.stringify(cookie));
        }
      }
    } else {
      if (cookie) {
        cookie.repeat = [{ href: location.href, count: 1 }];
        localStorage.setItem("startPopup", JSON.stringify(cookie));
      } else {
        localStorage.setItem("startPopup", JSON.stringify({ repeat: [{ href: location.href, count: 1 }] }));
      }
    }
  }

  // =================

  const showDelay = +$startPopup?.dataset.showDelay || 1500;

  if (!$startPopup || !$modalsWrap || !$startPopup) return;

  if ($startPopup.hasAttribute("data-type-show") === "once") {
    localStorage.setItem("on")
  }

  setTimeout(() => {
    $modalsWrap.setAttribute("active", "");
    $startPopup.setAttribute("active", "");
  }, showDelay);
}

function closeStartPopup() {
  $modalsWrap.removeAttribute("active");
  $startPopup.removeAttribute("active");
}

function copyPromocode() {
  navigator.clipboard.writeText($promocode.querySelector(".promocode").textContent);
  $promocode.setAttribute("active", "");

  setTimeout(() => {
    $promocode.removeAttribute("active");
  }, 600);
}