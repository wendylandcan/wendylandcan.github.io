const language = document.querySelector('.language');
const navigation = document.querySelectorAll('.nav a, .header-contact');

function syncLocation() {
  const fragment = window.location.hash;
  if (language) {
    const href = new URL(language.getAttribute('href'), window.location.href);
    href.hash = fragment;
    language.href = href.href;
  }
  for (const link of navigation) {
    if (link.hash === fragment) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

syncLocation();
window.addEventListener('hashchange', syncLocation);

const copyButton = document.querySelector('.copy-button');
const copyStatus = document.querySelector('.copy-status');

if (copyButton && copyStatus) {
  copyButton.hidden = false;
  const label = copyButton.textContent;
  let resetLabel;
  copyButton.addEventListener('click', async () => {
    clearTimeout(resetLabel);
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyButton.textContent = copyButton.dataset.copied;
      copyStatus.textContent = copyButton.dataset.copied;
      resetLabel = setTimeout(() => {
        copyButton.textContent = label;
        copyStatus.textContent = '';
      }, 2200);
    } catch {
      copyButton.textContent = label;
      copyStatus.textContent = copyButton.dataset.error;
    }
  });
}
