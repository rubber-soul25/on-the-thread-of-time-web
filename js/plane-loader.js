async function loadPlaneEntry() {
  const params = new URLSearchParams(window.location.search);
  const planeId = params.get('id');
  const activeTimeline = params.get('timeline') || 'lenara';

  if (!planeId) {
    document.querySelector('main').innerHTML = '<p>No plane specified.</p>';
    return;
  }

  const planesResponse = await fetch('/data/planes.json');
  const planes = await planesResponse.json();
  const plane = planes.find(p => p.id === planeId);

  if (!plane) {
    document.querySelector('main').innerHTML = '<p>Plane not found.</p>';
    return;
  }

  const name = activeTimeline === 'lenara' ? plane.lenaraName : plane.aranelName;
  const description = activeTimeline === 'lenara' ? plane.lenaraDescription : plane.aranelDescription;

  document.getElementById('page-title').textContent = `${name} — On the Thread of Time`;
  document.getElementById('plane-name').textContent = name;
  document.getElementById('plane-description').textContent = description;

  // Render the timeline switch — stays on the SAME plane, just flips timeline
  document.getElementById('timeline-switch').innerHTML = `
    <a href="plane.html?id=${planeId}&timeline=lenara" class="${activeTimeline === 'lenara' ? 'active' : ''}">Lenara</a>
    <a href="plane.html?id=${planeId}&timeline=aranel" class="${activeTimeline === 'aranel' ? 'active' : ''}">Aranel</a>
  `;

  // Render places belonging to this plane + this timeline only
  const placesResponse = await fetch('/data/places.json');
  const places = await placesResponse.json();
  const filteredPlaces = places.filter(place => place.plane === planeId && place.timeline === activeTimeline);
  const grid = document.getElementById('places-grid');

  if (filteredPlaces.length === 0) {
    grid.innerHTML = '<p style="opacity: 0.6;">No places recorded here yet.</p>';
    return;
  }

  grid.innerHTML = filteredPlaces.map(place => `
    <a href="../entry/temp-place.html?id=${place.id}" class="entry-card">
      <div class="entry-card-portrait">
        <img src="${place.portrait}" alt="${place.name}">
      </div>
      <div class="entry-card-body">
        <div class="entry-card-name">${place.name}</div>
        <div class="entry-card-title">${place.type}</div>
        <p class="entry-card-blurb">${place.blurb}</p>
      </div>
    </a>
  `).join('');
}

loadPlaneEntry();