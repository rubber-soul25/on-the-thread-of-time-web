async function loadDeityEntry() {
  const params = new URLSearchParams(window.location.search);
  const deityId = params.get('id');

  if (!deityId) {
    document.querySelector('main').innerHTML = '<p>No deity specified.</p>';
    return;
  }

  const response = await fetch('/data/supernatural.json');
  const deities = await response.json();
  const deity = deities.find(d => d.id === deityId);

  if (!deity) {
    document.querySelector('main').innerHTML = '<p>Deity not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${deity.name} — On the Thread of Time`;
  document.getElementById('deity-portrait').src = deity.portrait;
  document.getElementById('deity-portrait').alt = deity.name;
  document.getElementById('deity-name').textContent = deity.name;
  document.getElementById('deity-domain').textContent = deity.domain;
  document.getElementById('deity-alignment').textContent = deity.alignment;
  document.getElementById('deity-worshipers').textContent = deity.worshipers;
  document.getElementById('deity-description').textContent = deity.description;
  document.getElementById('deity-worship').textContent = deity.worship;
  document.getElementById('deity-history').textContent = deity.history;
}

loadDeityEntry();