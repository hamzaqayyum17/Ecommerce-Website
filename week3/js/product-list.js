const productsList = document.getElementById("productsList");
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const pagesContainer = document.getElementById('pages');
const showCount = document.getElementById('showCount');

let state = {
  query: '',
  category: 'all',
  page: 1,
  perPage: parseInt(showCount ? showCount.value : 10, 10) || 10
};

function filterProducts() {
  const q = state.query.trim().toLowerCase();
  return products.filter(p => {
    if (state.category !== 'all' && String(state.category) !== 'all') {
      // placeholder for category filtering if product has category
      // currently all products pass
    }
    if (!q) return true;
    return (p.name && p.name.toLowerCase().includes(q)) ||
           (p.description && p.description.toLowerCase().includes(q)) ||
           (p.type && p.type.toLowerCase().includes(q));
  });
}

function renderProducts() {
  const filtered = filterProducts();
  const total = filtered.length;
  const start = (state.page - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);

  productsList.innerHTML = pageItems.map(product => `
    <div class="product-card">
      <img src="${product.image}" class="product-img">
      <div class="product-info">
        <h4>${product.name}</h4>
        <div class="price-row">
          <span class="price">$${product.price}</span>
          ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
        </div>
        <div class="rating">⭐⭐⭐⭐☆ <span>${product.rating}</span> · ${product.orders} orders · <span class="green">${product.freeShipping ? 'Free Shipping' : ''}</span></div>
        <p class="desc">${product.description || ''}</p>
        <a href="product-detail.html?id=${product.id}" class="details-link">View details</a>
      </div>
      <button class="wishlist">♡</button>
    </div>
  `).join('');

  renderPagination(total);
}

function renderPagination(totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / state.perPage));
  pagesContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === state.page ? ' active' : '');
    btn.textContent = i;
    btn.dataset.page = i;
    pagesContainer.appendChild(btn);
  }
}

// Event bindings
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    state.page = 1;
    renderProducts();
  });
}

if (categorySelect) {
  categorySelect.addEventListener('change', (e) => {
    state.category = e.target.value;
    state.page = 1;
    renderProducts();
  });
}

if (showCount) {
  showCount.addEventListener('change', (e) => {
    state.perPage = parseInt(e.target.value, 10) || 10;
    state.page = 1;
    renderProducts();
  });
}

if (pagesContainer) {
  pagesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const page = parseInt(btn.dataset.page, 10);
    if (!isNaN(page)) {
      state.page = page;
      renderProducts();
    }
  });
}

// initial render
renderProducts();
