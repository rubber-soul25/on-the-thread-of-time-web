async function loadOrgEntry() {
  const params = new URLSearchParams(window.location.search);
  const orgId = params.get('id');

  if (!orgId) {
    document.querySelector('main').innerHTML = '<p>No organization specified.</p>';
    return;
  }

  const response = await fetch('/data/organizations.json');
  const orgs = await response.json();
  const org = orgs.find(o => o.id === orgId);

  if (!org) {
    document.querySelector('main').innerHTML = '<p>Organization not found.</p>';
    return;
  }

  document.getElementById('page-title').textContent = `${org.name} — On the Thread of Time`;
  document.getElementById('org-portrait').src = org.portrait;
  document.getElementById('org-portrait').alt = org.name;
  document.getElementById('org-name').textContent = org.name;
  document.getElementById('org-type').textContent = org.type;
  document.getElementById('org-headquarters').textContent = org.headquarters;
  document.getElementById('org-leader').textContent = org.leader;
  document.getElementById('org-description').textContent = org.description;
  document.getElementById('org-goals').textContent = org.goals;
  document.getElementById('org-notable-members').textContent = org.notableMembers;
}

loadOrgEntry();