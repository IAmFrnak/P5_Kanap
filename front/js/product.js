console.log(window.location.search);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const quantityInput = document.getElementById("quantity");
const productId = urlParams.get("id");
const colorSelect = document.getElementById("colors");

const url = `http://localhost:3000/api/products/${productId}`;

async function fetchSingleProduct() {
  try {
    const response = await fetch(url);

    const productData = await response.json();
    return productData;
  } catch (error) {
    console.log("Error fetching product data:", error);
  }
}
// async function that grabs the data from fetchSingleProduct
async function displaySingleProduct() {
  const product = await fetchSingleProduct();
  const productTitle = document.getElementById("title");
  const productPrice = document.getElementById("price");
  const singleProductDescription = document.getElementById("description");
  const imgContainer = document.querySelector(".item__img");

  singleProductDescription.innerText = product.description;
  productTitle.innerText = product.name;
  productPrice.innerText = product.price;
  imgContainer.innerHTML = `
    <img src= '${product.imageUrl}' alt='${product.altTxt}'>
    `;

  // Changes the color options
  product.colors.forEach((color) => {
    const colorOption = document.createElement("option");
    colorOption.innerText = color;
    colorSelect.appendChild(colorOption);
  });
  // for (let i = 0; i < product.colors.length; i++) {
  //   const colorOption = document.createElement("option");
  //   colorOption.innerText = product.colors[i];
  //   colorSelect.appendChild(colorOption);
  // }
}

async function addToCart(selectedColor, quantity) {
  const cartStorage = JSON.parse(localStorage.getItem("localCart")) || [];

  const product = await fetchSingleProduct();
  const productObj = {
    productId: product._id,
    name: product.name,
    price: product.price,
    color: selectedColor,
    quantity: quantity,
  };

  const cartItems = cartStorage.findIndex(
    (item) => item.productId === product._id && item.color === selectedColor
  );
  // if the item exists, upadate the quantity
  if (cartItems !== -1) {
    cartStorage[cartItems].quantity += quantity;
  } else {
    cartStorage.push(productObj);
  }

  localStorage.setItem("localCart", JSON.stringify(cartStorage));
  console.log("Cart updated:", cartStorage);
  alert("Product added to cart!");
}

const addToCartBtn = document.getElementById("addToCartBtn");

addToCartBtn.addEventListener("click", function () {
  
  const selectedColor = colorSelect.value;
  const quantity = parseInt(quantityInput.value);
  addToCart(selectedColor, quantity);
});

document.addEventListener("DOMContentLoaded", displaySingleProduct());
