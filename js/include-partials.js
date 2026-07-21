async function loadPartial(selector, url) {
  const target = document.querySelector(selector);
  if (!target) return;
  const response = await fetch(url);
  const html = await response.text();
  target.innerHTML = html;

  // Highlight the active nav link based on current page
  const currentPage = window.location.pathname;
  target.querySelectorAll('[data-nav]').forEach(link => {
    if (currentPage.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

loadPartial('#header-placeholder', '/components/header.html');
loadPartial('#footer-placeholder', '/components/footer.html');