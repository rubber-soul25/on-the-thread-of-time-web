async function loadGalleryImages() {
  const response = await fetch('/data/gallery-images.json');
  const images = await response.json();
  const container = document.getElementById('gallery-container');

  const grouped = {};
  images.forEach(img => {
    if (!grouped[img.category]) {
      grouped[img.category] = [];
    }
    grouped[img.category].push(img);
  });

  container.innerHTML = Object.keys(grouped).map(category => `
    <section class="gallery-section">
      <h2>${category}</h2>
      <div class="gallery-grid">
        ${grouped[category].map(img => `
          <div class="gallery-item">
            <img src="${img.image}" alt="${img.caption}">
            <p class="gallery-caption">${img.caption}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}

async function loadGalleryVideos() {
  const response = await fetch('/data/gallery-videos.json');
  const videos = await response.json();
  const grid = document.getElementById('videos-grid');

  grid.innerHTML = videos.map(video => `
    <div class="video-item">
      <iframe src="https://www.youtube.com/embed/${video.videoId}" title="${video.caption}" allowfullscreen></iframe>
      <p class="video-caption">${video.caption}</p>
    </div>
  `).join('');
}

loadGalleryImages();
loadGalleryVideos();