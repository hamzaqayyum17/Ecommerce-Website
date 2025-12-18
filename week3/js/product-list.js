const list = document.getElementById("productsList");

function renderProducts(items) {
  list.innerHTML = "";

  items.forEach(product => {
    list.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">
        <div class="product-info">
          <h4>$${product.price}</h4>
          <p>${product.name}</p>
          <a href="product-detail.html?id=${product.id}">
            View details
          </a>
        </div>
      </div>
    `;
  });
}

renderProducts(products);
