gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;
document.querySelectorAll(".anchor").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    let targetElem = document.querySelector(e.target.getAttribute("href")),
      y = targetElem;
    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
        totalMovement = (panels.length - 1) * targetElem.offsetWidth;
      y = Math.round(
        tween.scrollTrigger.start +
          (targetElem.offsetLeft / totalMovement) * totalScroll
      );
    }
    gsap.to(window, {
      scrollTo: {
        y: y,
        autoKill: false,
      },
      duration: 1,
    });
  });
});

/* Panels */
const panels = gsap.utils.toArray("#panels-container .panel");
tween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#panels-container",
    pin: true,
    start: "top top",
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      inertia: false,
      duration: { min: 0.1, max: 0.1 },
    },
    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
  },
});

function playVideo(videoClass) {
  var video = document.querySelector(videoClass); // 클래스로 비디오 요소 찾기
  video.play();
}

// panel2 video hover
function pauseVideo(videoClass) {
  var video = document.querySelector(videoClass); // 클래스로 비디오 요소 찾기
  video.pause();
  video.currentTime = 0;
  video.style.display = "none"; // 비디오를 숨깁니다.
  video.nextElementSibling.style.display = "block"; // 다음 형제 요소를 표시합니다. (포스터 이미지)
}

function showPoster(videoClass) {
  var video = document.querySelector(videoClass); // 클래스로 비디오 요소 찾기
  video.style.display = "block"; // 비디오를 표시합니다.
  video.nextElementSibling.style.display = "none"; // 다음 형제 요소를 숨깁니다. (포스터 이미지)
}

// panel3 swiper
var swiper = new Swiper(".swiper", {
  effect: "cards",
  grabCursor: true,
  initialSlide: 2,
  speed: 500,
  loop: true,
  rotate: true,
  mousewheel: {
    invert: false,
  },
});

//panel5
const items = document.querySelectorAll(".item");

const expand = (item, i) => {
  items.forEach((it, ind) => {
    if (i === ind) return;
    it.clicked = false;
    // 확장되지 않은 요소에 대해 블러 효과를 추가합니다.
    it.querySelector(".txt-box").style.filter = "blur(12px)";
  });

  // 아이템의 확장 상태를 변경합니다.
  item.clicked = !item.clicked;

  // 클릭된 아이템에 대해서는 블러 효과를 제거합니다.
  item.querySelector(".txt-box").style.filter = item.clicked
    ? "blur(0)"
    : "blur(12px)";

  // GSAP를 사용하여 아이템의 너비를 조정합니다.
  gsap.to(items, {
    width: item.clicked ? "125px" : "125px",
    duration: 0.3,
    ease: "power2",
  });

  gsap.to(item, {
    width: item.clicked ? "330px" : "125px",
    duration: 0.3,
    ease: "power2",
  });
};

items.forEach((item, i) => {
  // 각 아이템의 초기 클릭 상태를 설정합니다.
  item.clicked = false;
  item.addEventListener("click", () => expand(item, i));
});
