async function loadNpcEntry() {
  const params = new URLSearchParams(window.location.search);
  const npcId = params.get('id');

  if (!npcId) {
    document.querySelector('main').innerHTML = '<p>No NPC specified.</p>';
    return;
  }

  const response = await fetch('/data/npcs.json');
  const npcs = await response.json();
  const npc = npcs.find(n => n.id === npcId);

  if (!npc) {
    document.querySelector('main').innerHTML = '<p>NPC not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${npc.name} — On the Thread of Time`;
  document.getElementById('npc-portrait').src = npc.portrait;
  document.getElementById('npc-portrait').alt = npc.name;
  document.getElementById('npc-name').textContent = npc.name;
  document.getElementById('npc-role').textContent = npc.role;
  document.getElementById('npc-plane').textContent = npc.location;
  document.getElementById('npc-affiliation').textContent = npc.affiliation;
  document.getElementById('npc-description').textContent = npc.description;

}

loadNpcEntry();