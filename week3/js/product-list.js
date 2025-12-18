const productsList = document.getElementById("productsList");

productsList.innerHTML = products.map(product => `
  <div class="product-card">

    <img src="${product.image}" class="product-img">

    <div class="product-info">
      <h4>${product.name}</h4>

      <div class="price-row">
        <span class="price">$${product.price}</span>
        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ""}
      </div>

      <div class="rating">
        ⭐⭐⭐⭐☆ <span>${product.rating}</span> · ${product.orders} orders ·
        <span class="green">${product.freeShipping ? "Free Shipping" : ""}</span>
      </div>

      <p class="desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <a href="product-detail.html?id=${product.id}" class="details-link">
        View details
      </a>
    </div>

    <button class="wishlist">♡</button>
  </div>
`).join("");
