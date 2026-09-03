function initMapViewer() {
  const viewer = document.getElementById('map-viewer');
  const image = document.getElementById('map-image');

  let scale = 1;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX, startY;

  const minScale = 0.5;
  const maxScale = 4;

  function applyTransform() {
    image.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

  function zoom(delta, centerX, centerY) {
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    // Adjust position so zoom feels centered on the cursor
    const scaleRatio = newScale / scale;
    posX = centerX - (centerX - posX) * scaleRatio;
    posY = centerY - (centerY - posY) * scaleRatio;
    scale = newScale;
    applyTransform();
  }

  // Scroll to zoom
  viewer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = viewer.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    zoom(delta, cursorX, cursorY);
  });

  // Click and drag to pan
  viewer.addEventListener('mousedown', (e) => {
    isDragging = true;
    viewer.classList.add('dragging');
    startX = e.clientX - posX;
    startY = e.clientY - posY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    viewer.classList.remove('dragging');
  });

  // Button controls
  document.getElementById('zoom-in').addEventListener('click', () => {
    zoom(0.3, viewer.clientWidth / 2, viewer.clientHeight / 2);
  });

  document.getElementById('zoom-out').addEventListener('click', () => {
    zoom(-0.3, viewer.clientWidth / 2, viewer.clientHeight / 2);
  });

  document.getElementById('zoom-reset').addEventListener('click', () => {
    scale = 1;
    posX = 0;
    posY = 0;
    applyTransform();
  });

  applyTransform();
}

initMapViewer();