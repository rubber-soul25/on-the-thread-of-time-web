async function loadCharacterEntry() {
  // Get the "id" from the URL, e.g. character.html?id=uthred
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get('id');

  if (!characterId) {
    document.querySelector('main').innerHTML = '<p>No character specified.</p>';
    return;
  }

  const response = await fetch('/data/characters.json');
  const characters = await response.json();
  const character = characters.find(c => c.id === characterId);

  if (!character) {
    document.querySelector('main').innerHTML = '<p>Character not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${character.name} — On the Thread of Time`;
  document.getElementById('char-portrait').src = character.portrait;
  document.getElementById('char-portrait').alt = character.name;
  document.getElementById('char-name').textContent = character.name;
  document.getElementById('char-epithet').textContent = character.epithet;
  document.getElementById('char-class').textContent = character.class;
  document.getElementById('char-faction').textContent = character.faction;
  document.getElementById('char-description').textContent = character.description;
  document.getElementById('char-history').textContent = character.history;
}

loadCharacterEntry();