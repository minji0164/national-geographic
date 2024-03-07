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
