window.addEventListener('DOMContentLoaded', function () {
  const media = document.getElementById('scrolling-media');

  // Only clone if not already cloned
  if (!media.classList.contains('media-cloned')) {
    Array.from(media.children).forEach(child => {
      media.appendChild(child.cloneNode(true));
    });
    media.classList.add('media-cloned');
  }

  function setAnimation() {
    const children = media.children;
    let width = 0;
    const gap = parseFloat(getComputedStyle(media).gap || 16);
    const half = children.length / 2;

    for (let i = 0; i < half; i++) {
      width += children[i].offsetWidth + gap;
    }

    width -= gap;
    media.style.setProperty('--scroll-distance', `-${width}px`);

    const pxPerSecond = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--scroll-speed')) || 80;
    const duration = width / pxPerSecond;
    media.style.animationDuration = `${duration}s`;
  }

  function waitForMediaLoad(callback) {
    const mediaElements = media.querySelectorAll('img, video');
    let loaded = 0;
    if (mediaElements.length === 0) return callback();

    mediaElements.forEach(el => {
      if (el.complete || el.readyState >= 3) {
        loaded++;
        if (loaded === mediaElements.length) callback();
      } else {
        el.addEventListener('load', check);
        el.addEventListener('loadeddata', check);
      }

      function check() {
        loaded++;
        if (loaded === mediaElements.length) callback();
      }
    });
  }

  waitForMediaLoad(() => requestAnimationFrame(setAnimation));
  new ResizeObserver(() => requestAnimationFrame(setAnimation)).observe(media);
});
