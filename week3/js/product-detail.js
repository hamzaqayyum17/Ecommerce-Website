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
  const sizeSelect = document.getElementById('sizeSelect');
  const addToCartBtn = document.getElementById('addToCartBtn');

  // Populate basic fields
  if (mainImage) mainImage.src = p.image || mainImage.src;
  if (title) title.textContent = p.name || title.textContent;
  if (ratingNumber) ratingNumber.textContent = p.rating || ratingNumber.textContent;
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

  // Thumbnails -> change main image
  document.querySelectorAll('.thumbs img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      if (mainImage && e.target && e.target.src) mainImage.src = e.target.src;
    });
  });

  // Populate sizes if product provides them
  if (sizeSelect) {
    if (Array.isArray(p.sizes) && p.sizes.length) {
      sizeSelect.innerHTML = p.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
    }
  }

  // Add to cart: simple localStorage implementation
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedSize = sizeSelect ? sizeSelect.value : null;
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ id: p.id, name: p.name, price: p.price, size: selectedSize, qty: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      // lightweight visual feedback
      addToCartBtn.textContent = 'Added';
      addToCartBtn.disabled = true;
      setTimeout(() => {
        addToCartBtn.textContent = 'Add to cart';
        addToCartBtn.disabled = false;
      }, 1200);
    });
  }

  // Search bar interactivity (focus, typing, button click)
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.querySelector('.search-bar');

  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      if (searchBar) searchBar.classList.add('focused');
    });
    searchInput.addEventListener('blur', () => {
      if (searchBar) searchBar.classList.remove('focused');
    });
    // typing feedback
    searchInput.addEventListener('input', (e) => {
      const val = (e.target.value || '').trim();
      let hint = searchBar.querySelector('.search-hint');
      if (!hint) {
        hint = document.createElement('div');
        hint.className = 'search-hint';
        searchBar.appendChild(hint);
      }
      hint.textContent = val ? `Searching: "${val}"` : '';
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const q = searchInput ? (searchInput.value || '').trim() : '';
      // visual micro-interaction
      searchBtn.textContent = 'Searching...';
      setTimeout(() => {
        searchBtn.textContent = 'Search';
        // For this demo, just show a console message and a small highlight
        console.log('Search clicked for:', q);
        if (searchBar) {
          searchBar.classList.add('searched');
          setTimeout(() => searchBar.classList.remove('searched'), 800);
        }
      }, 600);
    });
  }

});
