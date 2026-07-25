async function loadPlacesIndex() {
  const params = new URLSearchParams(window.location.search);
  const activeTimeline = params.get('timeline') || 'lenara'; // default to Lenara

  // Render the switch
  const switchEl = document.getElementById('timeline-switch');
  switchEl.innerHTML = `
    <a href="places.html?timeline=lenara" class="${activeTimeline === 'lenara' ? 'active' : ''}">Lenara</a>
    <a href="places.html?timeline=aranel" class="${activeTimeline === 'aranel' ? 'active' : ''}">Aranel</a>
  `;

  // Render the 4 plane cards for the active timeline
  const response = await fetch('/data/planes.json');
  const planes = await response.json();
  const grid = document.getElementById('planes-grid');

  grid.innerHTML = planes.map(plane => {
    const name = activeTimeline === 'lenara' ? plane.lenaraName : plane.aranelName;
    const description = activeTimeline === 'lenara' ? plane.lenaraDescription : plane.aranelDescription;
    const image = activeTimeline === 'lenara' ? plane.lenaraImage : plane.aranelImage;

    return `
      <a href="planes/plane.html?id=${plane.id}&timeline=${activeTimeline}" class="entry-card">
        <div class="entry-card-portrait">
          <img src="${image}" alt="${name}">
        </div>
        <div class="entry-card-body">
          <div class="entry-card-name">${name}</div>
          <p class="entry-card-blurb">${description}</p>
        </div>
      </a>
    `;
  }).join('');
}

loadPlacesIndex();