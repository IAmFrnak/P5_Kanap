const url = "http://localhost:3000/api/products";

async function fetchAllProducts() {
  try {
    const response = await fetch(url);
    console.log(response);

    const productData = await response.json();
    return productData;
  } catch (error) {
    console.log("Error");
  }
}

async function displayAllProducts() {
  const itemsContainer = document.getElementById("items");
  const products = await fetchAllProducts();

  products.forEach((product) => {
    const productLinkEl = document.createElement("a");

    productLinkEl.setAttribute("href", `./product.html?id=${product._id}`);

    productLinkEl.innerHTML = `
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription> ${product.description}</p>
        </article>

`;
    itemsContainer.appendChild(productLinkEl);
  });
}



document.addEventListener('DOMContentLoaded', displayAllProducts());