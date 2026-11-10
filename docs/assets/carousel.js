(() => {
  const root = document.querySelector(".research-carousel");
  if (!root) return;
  const slides = JSON.parse(document.querySelector("#carousel-slides").textContent);
  const article = root.querySelector(".carousel-slide");
  const image = root.querySelector(".carousel-image");
  const copy = root.querySelector(".carousel-content");
  const toggle = root.querySelector(".carousel-playback");
  const dots = [...root.querySelectorAll(".carousel-controls > div button")];
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0, paused = motion.matches, hovered = false, warm, tick;
  function schedule() {
    clearTimeout(warm); clearTimeout(tick);
    if (paused || hovered || document.hidden || !image.complete || !image.naturalWidth) return;
    const next = (current + 1) % slides.length;
    warm = setTimeout(() => { const img = new Image(); img.fetchPriority = "low"; img.src = slides[next].image; }, 2500);
    tick = setTimeout(() => show(next), 5200);
  }
  function playback() {
    const label = paused ? "Play slideshow" : "Pause slideshow";
    toggle.title = label;
    toggle.setAttribute("aria-label",label);
    toggle.querySelector("path").setAttribute("d",paused ? "M4 2l10 6-10 6z" : "M3 2h4v12H3zM9 2h4v12H9z");
    article.setAttribute("aria-live",paused ? "polite" : "off");
    schedule();
  }
  function show(i) {
    current = (i + slides.length) % slides.length;
    const s = slides[current];
    article.className = "carousel-slide " + s.className + " is-active";
    copy.querySelector("p").textContent = s.kicker;
    copy.querySelector("h2").textContent = s.title;
    copy.querySelector("span").textContent = s.detail;
    image.alt = s.alt;
    image.src = s.image;
    dots.forEach((b,n) => {
      b.classList.toggle("active", n === current);
      if (n === current) b.setAttribute("aria-current","true"); else b.removeAttribute("aria-current");
    });
    playback();
  }
  function select(i) { paused = true; show(i); }
  toggle.addEventListener("click",() => { paused = !paused; hovered = false; playback(); });
  root.querySelector('[aria-label="Previous slide"]').addEventListener("click",() => select(current - 1));
  root.querySelector('[aria-label="Next slide"]').addEventListener("click",() => select(current + 1));
  dots.forEach((b,i) => b.addEventListener("click",() => select(i)));
  root.addEventListener("pointerenter",e => { if(e.pointerType === "mouse") { hovered = true; schedule(); } });
  root.addEventListener("pointerleave",() => { hovered = false; schedule(); });
  root.addEventListener("focusin",e => { if(e.target.matches(":focus-visible") && !root.contains(e.relatedTarget)) { paused = true; playback(); } });
  motion.addEventListener("change",() => { paused = motion.matches; playback(); });
  image.addEventListener("load",schedule);
  document.addEventListener("visibilitychange",schedule);
  playback();
})();
