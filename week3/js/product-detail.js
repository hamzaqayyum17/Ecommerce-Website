document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = (typeof products !== 'undefined') ? products.find(p => p.id === id) : null;
  const fallback = (typeof products !== 'undefined' && products.length) ? products[0] : null;
  const p = product || fallback;

  if (!p) return;

  const mainImage = document.getElementById('mainImage');
  const title = document.getElementById('productTitle');
  const priceBox = document.getElementById('priceBox');
  const specs = document.getElementById('specsList');
  const desc = document.getElementById('productDesc');
  const ratingNumber = document.getElementById('ratingNumber');

  if (mainImage) mainImage.src = p.image;
  if (title) title.textContent = p.name;
  if (ratingNumber) ratingNumber.textContent = p.rating;
  if (desc) desc.textContent = p.description || '';

  if (priceBox) {
    const priceHtml = `<div class="current-price">$${p.price} <small>per unit</small></div>`;
    const old = p.oldPrice ? `<div class="old-price">$${p.oldPrice}</div>` : '';
    priceBox.innerHTML = priceHtml + old;
  }

  if (specs) {
    specs.innerHTML = `
      <li><strong>Price:</strong> ${p.price ? '$' + p.price : 'Negotiable'}</li>
      <li><strong>Type:</strong> ${p.type || 'General'}</li>
      <li><strong>Material:</strong> ${p.material || 'N/A'}</li>
      <li><strong>Design:</strong> ${p.design || 'Standard'}</li>
    `;
  }

});
