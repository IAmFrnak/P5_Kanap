const url = "http://localhost:3000/api/products";

async function fetchProducts() {
  try {
    const response = await fetch(url);
    console.log(response);

    const productData = await response.json();
    return productData;
  } catch (error) {
    console.log("Error");
  }
}

async function renderProducts() {
  const itemsContainer = document.getElementById("items");
  const products = await fetchProducts();

  products.forEach((product) => {
    const productLinkElement = document.createElement("a");

    productLinkElement.setAttribute("href", `./product.html?id=${product._id}`);

    productLinkElement.innerHTML = `
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>

`;
    itemsContainer.appendChild(productLinkElement);
  });
}

renderProducts();
